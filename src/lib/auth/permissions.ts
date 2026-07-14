// src/lib/auth/permissions.ts
import { getSession } from "./session";

const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"];
const SUPER_ADMIN_ROLES = ["SUPER_ADMIN"];

export async function requireAdmin() {
  const session = await getSession();

  if (!session) {
    return { error: "UNAUTHORIZED" as const, session: null };
  }

  const role = (session.user as any).role;
  if (!ADMIN_ROLES.includes(role)) {
    return { error: "FORBIDDEN" as const, session };
  }

  return { error: null, session };
}

export async function requireSuperAdmin() {
  const session = await getSession();

  if (!session) {
    return { error: "UNAUTHORIZED" as const, session: null };
  }

  const role = (session.user as any).role;
  if (!SUPER_ADMIN_ROLES.includes(role)) {
    return { error: "FORBIDDEN" as const, session };
  }

  return { error: null, session };
}