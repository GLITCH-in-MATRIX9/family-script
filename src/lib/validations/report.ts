import { z } from "zod";

export const getReportsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(["PENDING", "REVIEWED", "DISMISSED", "ACTION_TAKEN"]).optional(),
  entityType: z.enum(["TREE", "TREE_NODE", "RELATIONSHIP"]).optional(),
});

// NEW: for validating the dynamic route param
export const reportIdParamSchema = z.object({
  reportId: z.string().min(1, "Report ID is required"),
});

//23
export const createReportSchema = z.object({
  entityType: z.enum(["TREE", "TREE_NODE", "RELATIONSHIP"]),
  entityId: z.string().min(1, "Entity ID is required"),
  reason: z
    .string()
    .min(10, "Reason must be at least 10 characters")
    .max(1000, "Reason must be at most 1000 characters"),
});