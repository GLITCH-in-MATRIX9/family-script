// src/app/api/v1/admin/reports/[reportId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/permissions";
import { reportIdParamSchema } from "@/lib/validations/report";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
) {
  // 1. Auth check
  const { error, session } = await requireAdmin();

  if (error === "UNAUTHORIZED") {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (error === "FORBIDDEN") {
    return NextResponse.json(
      { success: false, error: "Insufficient role" },
      { status: 403 }
    );
  }

  // 2. Validate route param
  const resolvedParams = await params;
  const parsed = reportIdParamSchema.safeParse(resolvedParams);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Invalid report ID" },
      { status: 400 }
    );
  }

  const { reportId } = parsed.data;

  try {
    // 3. Fetch report
    const report = await prisma.report.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      return NextResponse.json(
        { success: false, error: "Report not found" },
        { status: 404 }
      );
    }

    // 4. Map to response shape
    return NextResponse.json({
      success: true,
      data: {
        id: report.id,
        reportedBy: report.reportedById,
        entityType: report.entityType,
        entityId: report.entityId,
        reason: report.reason,
        status: report.status,
        resolvedBy: report.reviewedById,
        resolvedAt: report.reviewedAt,
        createdAt: report.createdAt,
      },
    });
  } catch (err) {
    console.error("GET /api/v1/admin/reports/[reportId] error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}