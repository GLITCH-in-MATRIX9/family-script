import { Gender } from "@prisma/client";
import { z } from "zod";
import { TreeType, TreeVisibility, TreeMemberRole } from "@prisma/client";
import { RelationshipType, RelationshipStatus, ParentRelationshipKind } from "@prisma/client";

import {
  TREE_NAME_MIN_LENGTH,
  TREE_NAME_MAX_LENGTH,
  TREE_DESCRIPTION_MAX_LENGTH,
} from "./tree.constants";

/**
 * Create Tree
 */
export const createTreeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(TREE_NAME_MIN_LENGTH, `Tree name must be at least ${TREE_NAME_MIN_LENGTH} characters.`)
    .max(TREE_NAME_MAX_LENGTH, `Tree name cannot exceed ${TREE_NAME_MAX_LENGTH} characters.`),

  description: z
    .string()
    .trim()
    .max(
      TREE_DESCRIPTION_MAX_LENGTH,
      `Description cannot exceed ${TREE_DESCRIPTION_MAX_LENGTH} characters.`
    )
    .optional(),

  type: z.nativeEnum(TreeType).optional(),

  visibility: z.nativeEnum(TreeVisibility).optional(),

  coverImageUrl: z.string().url().optional(),

  defaultLanguage: z.string().trim().min(2).max(10).optional(),
});

/**
 * Update Tree
 */
export const updateTreeSchema = createTreeSchema
  .partial()
  .extend({
    isArchived: z.boolean().optional(),
  });

/**
 * Invite Member
 */
export const inviteMemberSchema = z.object({
  email: z.email().trim(),

  role: z.nativeEnum(TreeMemberRole),
});

/**
 * Update Member Role
 */
export const updateMemberRoleSchema = z.object({
  role: z.nativeEnum(TreeMemberRole),
});

/**
 * Tree ID Param
 */
export const treeIdSchema = z.object({
  treeId: z.cuid(),
});

/**
 * Pagination Query
 */
export const treePaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(10),
});

/**
 * Search Query
 */
export const treeSearchSchema = z.object({
  search: z.string().trim().optional(),
});

/**
 * Combined Query Schema
 */
export const treeQuerySchema = treePaginationSchema.merge(treeSearchSchema);

/**
 * Export inferred types
 */
export type CreateTreeSchema = z.infer<typeof createTreeSchema>;
export type UpdateTreeSchema = z.infer<typeof updateTreeSchema>;
export type InviteMemberSchema = z.infer<typeof inviteMemberSchema>;
export type UpdateMemberRoleSchema = z.infer<typeof updateMemberRoleSchema>;
export type TreeQuerySchema = z.infer<typeof treeQuerySchema>;

export const createTreeNodeSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(100, "First name cannot exceed 100 characters."),
 
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(100, "Last name cannot exceed 100 characters."),
 
  middleName: z.string().trim().max(100).optional(),
  maidenName: z.string().trim().max(100).optional(),
  displayName: z.string().trim().max(255).optional(),
  nickname: z.string().trim().max(100).optional(),
 
  gender: z.nativeEnum(Gender).optional(),
 
  birthDate: z.coerce.date().optional(),
  birthPlace: z.string().trim().max(255).optional(),
  deathDate: z.coerce.date().optional(),
  deathPlace: z.string().trim().max(255).optional(),
  isLiving: z.boolean().optional(),
 
  bio: z.string().trim().optional(),
  avatarUrl: z.string().url().optional(),
  occupation: z.string().trim().max(255).optional(),
  bloodGroup: z.string().trim().max(10).optional(),
 
  // Optional link to a registered platform user (e.g. inviting them later)
  linkedUserId: z.cuid().optional(),
});
 
/**
 * Update Tree Node
 */
export const updateTreeNodeSchema = createTreeNodeSchema.partial();
 
/**
 * Node ID Param
 */
export const nodeIdSchema = z.object({
  nodeId: z.cuid(),
});
 
/**
 * Export inferred types (add alongside your existing type exports)
 */
export type CreateTreeNodeSchema = z.infer<typeof createTreeNodeSchema>;
export type UpdateTreeNodeSchema = z.infer<typeof updateTreeNodeSchema>;

/**
 * Create Relationship
 */
export const createRelationshipSchema = z.object({
  sourceNodeId: z.cuid(),
  targetNodeId: z.cuid(),
 
  type: z.nativeEnum(RelationshipType),
 
  // Only meaningful when type = PARENT
  parentKind: z.nativeEnum(ParentRelationshipKind).optional(),
 
  status: z.nativeEnum(RelationshipStatus).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
 
  notes: z.string().trim().max(1000).optional(),
})
  .refine((data) => data.sourceNodeId !== data.targetNodeId, {
    message: "A node cannot have a relationship with itself.",
    path: ["targetNodeId"],
  });
 
/**
 * Update Relationship
 * (only status/dates/notes are editable — not source/target/type,
 * since changing those is really "delete and recreate")
 */
export const updateRelationshipSchema = z.object({
  status: z.nativeEnum(RelationshipStatus).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  notes: z.string().trim().max(1000).optional(),
});
 
/**
 * Relationship ID Param
 */
export const relationshipIdSchema = z.object({
  relationshipId: z.cuid(),
});
 
/**
 * Query Relationships (optionally filter by a specific node)
 */
export const relationshipQuerySchema = z.object({
  nodeId: z.cuid().optional(),
});
 
/**
 * Export inferred types (add alongside your existing type exports)
 */
export type CreateRelationshipSchema = z.infer<typeof createRelationshipSchema>;
export type UpdateRelationshipSchema = z.infer<typeof updateRelationshipSchema>;
export type RelationshipQuerySchema = z.infer<typeof relationshipQuerySchema>;

/**
 * Update Family Profile
 * All fields optional — this is an upsert, so a user can fill in
 * whichever fields they know, whenever they know them.
 */
export const updateFamilyProfileSchema = z.object({
  occupation: z.string().trim().max(255).optional(),
  bloodGroup: z.string().trim().max(10).optional(),
  currentLocation: z.string().trim().max(255).optional(),
  nativePlace: z.string().trim().max(255).optional(),
  marriageDate: z.coerce.date().optional(),
  hereditaryDisorders: z.array(z.string().trim().max(100)).optional(),
});
 
export type UpdateFamilyProfileSchema = z.infer<typeof updateFamilyProfileSchema>;

/**
 * Update Organization Profile
 */
export const updateOrganizationProfileSchema = z.object({
  designation: z.string().trim().max(255).optional(),
  joiningDate: z.coerce.date().optional(),
  retirementDate: z.coerce.date().optional(),
  accolades: z.array(z.string().trim().max(100)).optional(),
});

/**
 * Update Tribe Profile
 */
export const updateTribeProfileSchema = z.object({
  interests: z.array(z.string().trim().max(100)).optional(),
  friendshipDate: z.coerce.date().optional(),
});

export type UpdateOrganizationProfileSchema = z.infer<typeof updateOrganizationProfileSchema>;
export type UpdateTribeProfileSchema = z.infer<typeof updateTribeProfileSchema>;

/**
 * Invite Contributor
 */
export const inviteContributorSchema = z.object({
  email: z.string().trim().email(),
  role: z.nativeEnum(TreeMemberRole).optional(),
  message: z.string().trim().max(500).optional(),
});
 
/**
 * Accept Invitation — token comes from the URL, not the body
 */
export const invitationTokenSchema = z.object({
  token: z.string().min(1),
});
 
/**
 * Update Contributor Role
 */
export const updateContributorRoleSchema = z.object({
  role: z.nativeEnum(TreeMemberRole),
});
 
/**
 * Contributor userId Param
 */
export const contributorUserIdSchema = z.object({
  userId: z.string().min(1),
});
 
export type InviteContributorSchema = z.infer<typeof inviteContributorSchema>;
export type UpdateContributorRoleSchema = z.infer<typeof updateContributorRoleSchema>;
 
/**
 * Timeline query params
 */
export const timelineQuerySchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
});

export type TimelineQuerySchema = z.infer<typeof timelineQuerySchema>;

export interface TimelineEvent {
  date: Date;
  title: string;
  nodeId: string;
}

export interface GraphNode {
  id: string;
  label: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
}

export interface TreeAnalytics {
  memberCount: number;
  relationshipCount: number;
  contributorCount: number;
  storiesGenerated: number;
  booksPublished: number;
}