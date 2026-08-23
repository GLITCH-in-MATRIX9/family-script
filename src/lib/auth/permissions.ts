// src/lib/auth/permissions.ts

import { getSession } from "./session";

const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"] as const;
const SUPER_ADMIN_ROLES = ["SUPER_ADMIN"] as const;

type UserWithRole = {
  role?: string;
};

export async function requireAdmin() {
  const session = await getSession();

  // No session = not authenticated
  if (!session) {
    return {
      error: "UNAUTHORIZED" as const,
      session: null,
    };
  }

  // Safely access the user's role
  const user = session.user as UserWithRole;
  const role = user.role;

  // Only ADMIN and SUPER_ADMIN can continue
  if (!role || !ADMIN_ROLES.includes(role as (typeof ADMIN_ROLES)[number])) {
    return {
      error: "FORBIDDEN" as const,
      session,
    };
  }

  return {
    error: null,
    session,
  };
}

export async function requireSuperAdmin() {
  const session = await getSession();

  // No session = not authenticated
  if (!session) {
    return {
      error: "UNAUTHORIZED" as const,
      session: null,
    };
  }

  // Safely access the user's role
  const user = session.user as UserWithRole;
  const role = user.role;

  // Only SUPER_ADMIN can continue
  if (
    !role ||
    !SUPER_ADMIN_ROLES.includes(
      role as (typeof SUPER_ADMIN_ROLES)[number]
    )
  ) {
    return {
      error: "FORBIDDEN" as const,
      session,
    };
  }

  return {
    error: null,
    session,
  };
}