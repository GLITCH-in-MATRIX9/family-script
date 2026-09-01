import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { InsufficientPermissionsError } from "@/modules/tree/tree.errors";
import { errorResponse } from "./api-response";

/**
 * Normalizes thrown errors into the standard API response envelope.
 * Known validation and database errors are mapped to user-friendly messages
 * and HTTP status codes.
 */
export function handleApiError(error: unknown) {
  // Validation failures should return the flattened field error payload.
  if (error instanceof ZodError) {
    return errorResponse("Validation failed.", 400, error.flatten());
  }
 
  // Prisma request errors are translated into stable API responses.
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        // Unique constraint violations.
        return errorResponse("A record with this value already exists.", 409);
 
      case "P2025":
        // Attempts to update or delete a record that no longer exists.
        return errorResponse("Record not found.", 404);
 
      default:
        // Any other Prisma request error falls back to a generic database error.
        return errorResponse("Database error.", 500);
    }
  }
 
  // Domain errors are mapped to their correct HTTP status by name,
  // since they all currently extend the base Error class and would
  // otherwise all fall into the generic 400 branch below.
  if (error instanceof Error) {
    switch (error.name) {
      // ── 403 Forbidden — caller is authenticated but not allowed ──
      case "InsufficientPermissionsError":
        return errorResponse(error.message, 403);
 
      // ── 404 Not Found ──
      case "TreeNotFoundError":
      case "TreeNodeNotFoundError":
      case "RelationshipNotFoundError":
      case "InvitationNotFoundError":
      case "ContributorNotFoundError":
        return errorResponse(error.message, 404);
 
      // ── 409 Conflict — the request is valid but collides with existing state ──
      case "TreeAlreadyExistsError":
      case "RelationshipAlreadyExistsError":
      case "ContributorAlreadyExistsError":
        return errorResponse(error.message, 409);
 
      // ── 410 Gone — the resource existed but is no longer usable ──
      case "InvitationExpiredError":
      case "InvitationAlreadyProcessedError":
        return errorResponse(error.message, 410);
 
      // ── 400 Bad Request — malformed/invalid input relative to context ──
      case "InvalidRelationshipTypeError":
      case "NodeNotInTreeError":
      case "InvalidTreeTypeForProfileError":
      case "DerivedRelationshipsRequireFamilyTreeError":
        return errorResponse(error.message, 400);
 
      // Any other Error not explicitly mapped above keeps the
      // previous default behavior.
      default:
        return errorResponse(error.message, 400);
    }
  }
 
  // Unknown failures are hidden behind a generic 500 response.
  return errorResponse("Internal server error.", 500);
}