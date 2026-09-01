/**
 * Thrown when a tree lookup does not return a matching record.
 * Use this to translate missing resources into a 404-style response.
 */
export class TreeNotFoundError extends Error {
  constructor() {
    super("Tree not found.");
    this.name = "TreeNotFoundError";
  }
}

/**
 * Thrown when a tree with the same display name already exists in the
 * relevant scope.
 */
export class TreeAlreadyExistsError extends Error {
  constructor(name: string) {
    super(`A tree named "${name}" already exists.`);
    this.name = "TreeAlreadyExistsError";
  }
}

/**
 * Thrown when a tree slug conflicts with another tree's slug.
 */
export class TreeSlugAlreadyExistsError extends Error {
  constructor(slug: string) {
    super(`The slug "${slug}" is already in use.`);
    this.name = "TreeSlugAlreadyExistsError";
  }
}

/**
 * Thrown when the authenticated user is not allowed to access the tree.
 */
export class TreeAccessDeniedError extends Error {
  constructor() {
    super("You do not have permission to access this tree.");
    this.name = "TreeAccessDeniedError";
  }
}

/**
 * Thrown when a tree is archived and the requested operation is no longer
 * permitted.
 */
export class TreeArchivedError extends Error {
  constructor() {
    super("This tree has been archived.");
    this.name = "TreeArchivedError";
  }
}

/**
 * Thrown when a membership record already exists for the user.
 */
export class MemberAlreadyExistsError extends Error {
  constructor() {
    super("User is already a member of this tree.");
    this.name = "MemberAlreadyExistsError";
  }
}

/**
 * Thrown when an owner tries to leave or delete a tree before transferring
 * ownership to someone else.
 */
export class OwnerTransferRequiredError extends Error {
  constructor() {
    super("Transfer ownership before leaving or deleting this tree.");
    this.name = "OwnerTransferRequiredError";
  }
}

/**
 * Thrown for tree operations that fail validation but do not fit a more
 * specific domain error.
 */
export class InvalidTreeOperationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidTreeOperationError";
  }
}


export class TreeNodeNotFoundError extends Error {
  constructor() {
    super("Tree node not found.");
    this.name = "TreeNodeNotFoundError";
  }
}
 
/**
 * Thrown when a relationship lookup does not return a matching record.
 */
export class RelationshipNotFoundError extends Error {
  constructor() {
    super("Relationship not found.");
    this.name = "RelationshipNotFoundError";
  }
}
 
/**
 * Thrown when the relationship type doesn't belong to the tree's type
 * (e.g. a MANAGER relationship inside a FAMILY tree).
 */
export class InvalidRelationshipTypeError extends Error {
  constructor(type: string, treeType: string) {
    super(`Relationship type "${type}" is not valid for a ${treeType} tree.`);
    this.name = "InvalidRelationshipTypeError";
  }
}
 
/**
 * Thrown when a relationship references a node that doesn't belong
 * to the same tree.
 */
export class NodeNotInTreeError extends Error {
  constructor() {
    super("One or both nodes do not belong to this tree.");
    this.name = "NodeNotInTreeError";
  }
}
 
/**
 * Thrown when the exact same relationship (source, target, type)
 * already exists.
 */
export class RelationshipAlreadyExistsError extends Error {
  constructor() {
    super("This relationship already exists.");
    this.name = "RelationshipAlreadyExistsError";
  }
}
/**
 * Thrown when a family-profile update is attempted on a node
 * that doesn't belong to a FAMILY-type tree.
 */
export class InvalidTreeTypeForProfileError extends Error {
  constructor(expectedType: string, actualType: string) {
    super(`This profile type requires a ${expectedType} tree, but this tree is ${actualType}.`);
    this.name = "InvalidTreeTypeForProfileError";
  }
}

export class InvitationNotFoundError extends Error {
  constructor() {
    super("Invitation not found.");
    this.name = "InvitationNotFoundError";
  }
}

export class InvitationExpiredError extends Error {
  constructor() {
    super("This invitation has expired.");
    this.name = "InvitationExpiredError";
  }
}

export class InvitationAlreadyProcessedError extends Error {
  constructor(status: string) {
    super(`This invitation has already been ${status.toLowerCase()}.`);
    this.name = "InvitationAlreadyProcessedError";
  }
}

export class ContributorNotFoundError extends Error {
  constructor() {
    super("Contributor not found on this tree.");
    this.name = "ContributorNotFoundError";
  }
}

export class ContributorAlreadyExistsError extends Error {
  constructor() {
    super("This user is already a contributor on this tree.");
    this.name = "ContributorAlreadyExistsError";
  }
}

/**
 * Thrown when derived (computed) relationships are requested on a
 * tree that isn't FAMILY type — the genealogy math (grandparent,
 * cousin, in-law, ...) only makes sense there.
 */
export class DerivedRelationshipsRequireFamilyTreeError extends Error {
  constructor(actualType: string) {
    super(`Derived relationships are only available for FAMILY trees, but this tree is ${actualType}.`);
    this.name = "DerivedRelationshipsRequireFamilyTreeError";
  }
}


export class InsufficientPermissionsError extends Error {
  constructor(action: string) {
    super(`You don't have permission to ${action}.`);
    this.name = "InsufficientPermissionsError";
  }
}
