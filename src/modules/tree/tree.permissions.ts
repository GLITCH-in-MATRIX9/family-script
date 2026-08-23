// src/modules/tree/tree.permissions.ts

import { TreeMemberRole } from "@prisma/client";

/**
 * Permission hierarchy
 *
 * OWNER
 * ├── ADMIN
 * │   ├── EDITOR
 * │   │   ├── CONTRIBUTOR
 * │   │   │   └── VIEWER
 *
 * Higher roles automatically have the permissions
 * of the roles below them.
 */

/**
 * Check if the member is the owner of the tree.
 */
export function isOwner(role: TreeMemberRole): boolean {
  return role === TreeMemberRole.OWNER;
}

/**
 * Check if the member is an admin or owner.
 */
export function isAdmin(role: TreeMemberRole): boolean {
  return (
    role === TreeMemberRole.OWNER ||
    role === TreeMemberRole.ADMIN
  );
}

/**
 * Check if the member can edit the tree.
 *
 * OWNER, ADMIN and EDITOR can edit.
 */
export function canEditTree(role: TreeMemberRole): boolean {
  return (
    role === TreeMemberRole.OWNER ||
    role === TreeMemberRole.ADMIN ||
    role === TreeMemberRole.EDITOR
  );
}

/**
 * Check if the member can manage tree members.
 *
 * Only OWNER and ADMIN can manage members.
 */
export function canManageMembers(role: TreeMemberRole): boolean {
  return (
    role === TreeMemberRole.OWNER ||
    role === TreeMemberRole.ADMIN
  );
}

/**
 * Check if the member can delete the tree.
 *
 * Only OWNER can delete a tree.
 */
export function canDeleteTree(role: TreeMemberRole): boolean {
  return role === TreeMemberRole.OWNER;
}

/**
 * Check if the member can invite other members.
 *
 * Only OWNER and ADMIN can invite members.
 */
export function canInviteMembers(role: TreeMemberRole): boolean {
  return (
    role === TreeMemberRole.OWNER ||
    role === TreeMemberRole.ADMIN
  );
}

/**
 * Check if the member can view the tree.
 *
 * Every valid tree member can view the tree.
 */
export function canViewTree(role: TreeMemberRole): boolean {
  return (
    role === TreeMemberRole.OWNER ||
    role === TreeMemberRole.ADMIN ||
    role === TreeMemberRole.EDITOR ||
    role === TreeMemberRole.CONTRIBUTOR ||
    role === TreeMemberRole.VIEWER
  );
}