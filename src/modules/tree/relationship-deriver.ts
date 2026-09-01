// src/modules/tree/relationship-deriver.ts
//
// Pure graph-traversal logic for deriving genealogical relationship
// labels (grandmother, cousin, aunt/uncle, in-law, ...) from the
// stored PARENT / SPOUSE / PARTNER / SIBLING / GUARDIAN edges.
//
// Deliberately kept free of Prisma client calls and Next.js concerns
// so it can be unit-tested with plain node/relationship fixtures.

import { TreeNode, Relationship, Gender, RelationshipType } from "@prisma/client";

export interface DerivedRelationship {
  nodeId: string;
  label: string;
  /** True if this label only holds through marriage (in-law), not blood. */
  viaMarriage: boolean;
}

const ORDINALS = [
  "",
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
  "Eighth",
  "Ninth",
  "Tenth",
];

function ordinal(n: number): string {
  return ORDINALS[n] ?? `${n}th`;
}

function genderedLabel(
  gender: Gender | undefined,
  male: string,
  female: string,
  neutral: string
): string {
  if (gender === "MALE") return male;
  if (gender === "FEMALE") return female;
  return neutral;
}

function greatPrefix(count: number): string {
  return count > 0 ? "Great-".repeat(count) : "";
}

/**
 * Labels a lineal (direct ancestor/descendant) relationship.
 * `generations` is always >= 1 here.
 */
function linealLabel(generations: number, isAncestor: boolean, gender?: Gender): string {
  if (generations === 1) {
    return isAncestor
      ? genderedLabel(gender, "Father", "Mother", "Parent")
      : genderedLabel(gender, "Son", "Daughter", "Child");
  }

  const greats = greatPrefix(generations - 2);
  return isAncestor
    ? `${greats}${genderedLabel(gender, "Grandfather", "Grandmother", "Grandparent")}`
    : `${greats}${genderedLabel(gender, "Grandson", "Granddaughter", "Grandchild")}`;
}

/**
 * Labels an aunt/uncle <-> niece/nephew style relationship.
 * `removed` is the generation gap beyond a plain sibling
 * (removed=1 is an ordinary aunt/uncle or niece/nephew).
 */
function avuncularLabel(removed: number, isElderSide: boolean, gender?: Gender): string {
  // removed=1 -> plain aunt/uncle; removed=2 -> great-aunt/uncle;
  // removed=3 -> great-great-aunt/uncle; and so on. ("Grand-" isn't
  // used here — "great" is the standard prefix for avuncular removes.)
  const greats = greatPrefix(removed - 1);

  return isElderSide
    ? `${greats}${genderedLabel(gender, "Uncle", "Aunt", "Aunt/Uncle")}`
    : `${greats}${genderedLabel(gender, "Nephew", "Niece", "Niece/Nephew")}`;
}

function cousinLabel(degree: number, removed: number): string {
  const base = `${ordinal(degree)} Cousin`;
  if (removed === 0) return base;
  return `${base}, ${removed} time${removed > 1 ? "s" : ""} Removed`;
}

/**
 * Derives a genealogical label purely from generation distances to
 * the nearest common ancestor. `up` = generations from root to the
 * common ancestor, `down` = generations from the common ancestor to
 * the target.
 */
function labelFromDistances(up: number, down: number, gender?: Gender): string {
  if (up === 0 && down === 0) return "Self";
  if (down === 0) return linealLabel(up, true, gender);
  if (up === 0) return linealLabel(down, false, gender);

  const degree = Math.min(up, down) - 1;
  const removed = Math.abs(up - down);

  // up === down === 1 is the immediate-sibling case, not a "0th
  // cousin, 0 removed" — that formula only kicks in once removed > 0
  // (aunt/uncle side) or degree > 0 (actual cousins).
  if (degree === 0 && removed === 0) {
    return genderedLabel(gender, "Brother", "Sister", "Sibling");
  }

  if (degree === 0) {
    return avuncularLabel(removed, up > down, gender);
  }

  return cousinLabel(degree, removed);
}

function addEdge(map: Map<string, Set<string>>, a: string, b: string) {
  if (!map.has(a)) map.set(a, new Set());
  map.get(a)!.add(b);
}

/**
 * Derives relationship labels from `rootNodeId` to every other node
 * reachable through blood, marriage, or guardianship edges.
 *
 * Blood relationships (parent/child/grandparent/sibling/aunt-uncle/
 * cousin, with correct "removed" degrees) are computed via BFS up
 * each node's parent chain to find the nearest common ancestor with
 * the root. SPOUSE/PARTNER, declared SIBLING, and GUARDIAN edges are
 * read directly. A small, explicit in-law layer covers the most
 * common cases: a spouse's parents/siblings, and a child's/sibling's
 * spouse.
 *
 * Not covered (by design, to keep this predictable): multi-hop
 * in-laws (e.g. "wife's cousin"), step-relationships from
 * ParentRelationshipKind, and half- vs full-sibling distinctions.
 */
export function deriveRelationships(
  rootNodeId: string,
  nodes: TreeNode[],
  relationships: Relationship[]
): DerivedRelationship[] {
  const nodeById = new Map(nodes.map((n) => [n.id, n]));

  const parentsOf = new Map<string, Set<string>>(); // childId -> Set<parentId>
  const spouseOf = new Map<string, Set<string>>();
  const declaredSiblings = new Map<string, Set<string>>();
  const guardianOf = new Map<string, Set<string>>(); // guardianId -> Set<wardId>
  const wardOf = new Map<string, Set<string>>(); // wardId -> Set<guardianId>

  for (const rel of relationships) {
    switch (rel.type) {
      case RelationshipType.PARENT:
        addEdge(parentsOf, rel.targetNodeId, rel.sourceNodeId);
        break;
      case RelationshipType.SPOUSE:
      case RelationshipType.PARTNER:
        addEdge(spouseOf, rel.sourceNodeId, rel.targetNodeId);
        addEdge(spouseOf, rel.targetNodeId, rel.sourceNodeId);
        break;
      case RelationshipType.SIBLING:
        addEdge(declaredSiblings, rel.sourceNodeId, rel.targetNodeId);
        addEdge(declaredSiblings, rel.targetNodeId, rel.sourceNodeId);
        break;
      case RelationshipType.GUARDIAN:
        addEdge(guardianOf, rel.sourceNodeId, rel.targetNodeId);
        addEdge(wardOf, rel.targetNodeId, rel.sourceNodeId);
        break;
      default:
        break; // MANAGER / FRIEND don't apply to FAMILY trees
    }
  }

  // Generations from root up to each of its ancestors.
  const ancestorDistance = new Map<string, number>();
  {
    let frontier = new Set([rootNodeId]);
    let gen = 0;
    const MAX_GENERATIONS = 20; // guards against malformed/cyclic data

    while (frontier.size > 0 && gen < MAX_GENERATIONS) {
      const next = new Set<string>();
      for (const id of frontier) {
        for (const parentId of parentsOf.get(id) ?? []) {
          if (!ancestorDistance.has(parentId)) {
            ancestorDistance.set(parentId, gen + 1);
            next.add(parentId);
          }
        }
      }
      frontier = next;
      gen += 1;
    }
  }

  /**
   * Walks targetId's own ancestor chain until it hits a node that is
   * also an ancestor of (or equal to) the root, returning how far up
   * from target and how far up from root that common ancestor is.
   */
  function findCommonAncestorDistances(targetId: string) {
    let frontier = new Set([targetId]);
    let down = 0;
    const visited = new Set<string>();
    const MAX_GENERATIONS = 20;

    while (frontier.size > 0 && down <= MAX_GENERATIONS) {
      for (const id of frontier) {
        if (id === rootNodeId) return { up: 0, down };
        if (ancestorDistance.has(id)) {
          return { up: ancestorDistance.get(id)!, down };
        }
      }
      const next = new Set<string>();
      for (const id of frontier) {
        visited.add(id);
        for (const parentId of parentsOf.get(id) ?? []) {
          if (!visited.has(parentId)) next.add(parentId);
        }
      }
      frontier = next;
      down += 1;
    }
    return null;
  }

  const distances = new Map<string, { up: number; down: number }>();

  for (const node of nodes) {
    if (node.id === rootNodeId) continue;
    const found = findCommonAncestorDistances(node.id);
    if (found) distances.set(node.id, found);
  }

  const derived: DerivedRelationship[] = [];
  const labeled = new Set<string>();

  for (const [nodeId, { up, down }] of distances) {
    const node = nodeById.get(nodeId);
    derived.push({
      nodeId,
      label: labelFromDistances(up, down, node?.gender),
      viaMarriage: false,
    });
    labeled.add(nodeId);
  }

  // Declared SIBLING edges catch half-/step-siblings or cases where
  // parents were never recorded — anyone the ancestor-chain pass
  // above didn't already resolve.
  for (const siblingId of declaredSiblings.get(rootNodeId) ?? []) {
    if (labeled.has(siblingId)) continue;
    const node = nodeById.get(siblingId);
    derived.push({
      nodeId: siblingId,
      label: genderedLabel(node?.gender, "Brother", "Sister", "Sibling"),
      viaMarriage: false,
    });
    distances.set(siblingId, { up: 1, down: 1 });
    labeled.add(siblingId);
  }

  // Direct spouse/partner.
  for (const spouseId of spouseOf.get(rootNodeId) ?? []) {
    const node = nodeById.get(spouseId);
    derived.push({
      nodeId: spouseId,
      label: genderedLabel(node?.gender, "Husband", "Wife", "Spouse/Partner"),
      viaMarriage: false,
    });
  }

  // Direct guardian/ward.
  for (const wardId of guardianOf.get(rootNodeId) ?? []) {
    derived.push({ nodeId: wardId, label: "Ward", viaMarriage: false });
  }
  for (const guardianId of wardOf.get(rootNodeId) ?? []) {
    derived.push({ nodeId: guardianId, label: "Guardian", viaMarriage: false });
  }

  // In-law layer, limited to the canonical single-hop cases:
  // spouse's parents, spouse's siblings, and a child's or sibling's spouse.
  for (const spouseId of spouseOf.get(rootNodeId) ?? []) {
    for (const parentId of parentsOf.get(spouseId) ?? []) {
      const node = nodeById.get(parentId);
      derived.push({
        nodeId: parentId,
        label: genderedLabel(node?.gender, "Father-in-law", "Mother-in-law", "Parent-in-law"),
        viaMarriage: true,
      });
    }
    for (const siblingId of declaredSiblings.get(spouseId) ?? []) {
      const node = nodeById.get(siblingId);
      derived.push({
        nodeId: siblingId,
        label: genderedLabel(node?.gender, "Brother-in-law", "Sister-in-law", "Sibling-in-law"),
        viaMarriage: true,
      });
    }
  }

  for (const [nodeId, { up, down }] of distances) {
    const isChild = up === 0 && down === 1;
    const isSibling = up === 1 && down === 1;
    if (!isChild && !isSibling) continue;

    for (const spouseId of spouseOf.get(nodeId) ?? []) {
      const node = nodeById.get(spouseId);
      derived.push({
        nodeId: spouseId,
        label: isSibling
          ? genderedLabel(node?.gender, "Brother-in-law", "Sister-in-law", "Sibling-in-law")
          : genderedLabel(node?.gender, "Son-in-law", "Daughter-in-law", "Child-in-law"),
        viaMarriage: true,
      });
    }
  }

  return derived;
}