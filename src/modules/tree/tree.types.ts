import { Gender } from "@prisma/client";
import { TreeType, TreeVisibility, TreeMemberRole } from "@prisma/client";
import { RelationshipType, RelationshipStatus, ParentRelationshipKind } from "@prisma/client";

/**
 * Data required to create a new tree.
 */
export interface CreateTreeInput {
  name: string;
  description?: string;
  type?: TreeType;
  visibility?: TreeVisibility;
  coverImageUrl?: string;
  defaultLanguage?: string;
}

/**
 * Data allowed when updating a tree.
 */
export interface UpdateTreeInput {
  name?: string;
  description?: string;
  visibility?: TreeVisibility;
  coverImageUrl?: string;
  defaultLanguage?: string;
  isArchived?: boolean;
}

/**
 * Filters used while fetching trees.
 */
export interface TreeFilters {
  ownerId?: string;
  type?: TreeType;
  visibility?: TreeVisibility;
  isArchived?: boolean;
}

/**
 * Pagination options.
 */
export interface TreePagination {
  page?: number;
  limit?: number;
}

/**
 * Current authenticated user.
 * Extend this later if your auth system returns more fields.
 */
export interface CurrentUser {
  id: string;
  email: string;
}

/**
 * Used when inviting a member.
 */
export interface InviteMemberInput {
  email: string;
  role: TreeMemberRole;
}

/**
 * Used for updating a member's role.
 */
export interface UpdateMemberRoleInput {
  role: TreeMemberRole;
}


/**
 * Data required to create a new tree node (person in the tree).
 */
export interface CreateTreeNodeInput {
  firstName: string;
  lastName: string;
  middleName?: string;
  maidenName?: string;
  displayName?: string;
  nickname?: string;
  gender?: Gender;
  birthDate?: Date;
  birthPlace?: string;
  deathDate?: Date;
  deathPlace?: string;
  isLiving?: boolean;
  bio?: string;
  avatarUrl?: string;
  linkedUserId?: string;
  occupation?: string;
  bloodGroup?: string;
}
 
/**
 * Data allowed when updating a tree node.
 */
export type UpdateTreeNodeInput = Partial<CreateTreeNodeInput>;
 
export interface CreateRelationshipInput {
  sourceNodeId: string;
  targetNodeId: string;
  type: RelationshipType;
  parentKind?: ParentRelationshipKind;
  status?: RelationshipStatus;
  startDate?: Date;
  endDate?: Date;
  notes?: string;
}
 
export interface UpdateRelationshipInput {
  status?: RelationshipStatus;
  startDate?: Date;
  endDate?: Date;
  notes?: string;
}

export interface UpdateFamilyProfileInput {
  occupation?: string;
  bloodGroup?: string;
  currentLocation?: string;
  nativePlace?: string;
  marriageDate?: Date;
  hereditaryDisorders?: string[];
}
 
export interface UpdateOrganizationProfileInput {
  designation?: string;
  joiningDate?: Date;
  retirementDate?: Date;
  accolades?: string[];
}

export interface UpdateTribeProfileInput {
  interests?: string[];
  friendshipDate?: Date;
}

export interface InviteContributorInput {
  email: string;
  role?: TreeMemberRole;
  message?: string;
}
 
export interface UpdateContributorRoleInput {
  role: TreeMemberRole;
}
 