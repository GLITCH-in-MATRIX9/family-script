import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { createReportSchema } from "@/lib/validations/report";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify authenticated user
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Parse + validate body
    const body = await request.json();
    const parsed = createReportSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { entityType, entityId, reason } = parsed.data;

    // 3. Validate entity exists (different table per entityType)
    let entityExists = false;

    if (entityType === "TREE") {
      const tree = await prisma.tree.findUnique({ where: { id: entityId } });
      entityExists = !!tree;
    } else if (entityType === "TREE_NODE") {
      const node = await prisma.treeNode.findUnique({ where: { id: entityId } });
      entityExists = !!node;
    } else if (entityType === "RELATIONSHIP") {
      const relationship = await prisma.relationship.findUnique({ where: { id: entityId } });
      entityExists = !!relationship;
    }

    if (!entityExists) {
      return NextResponse.json(
        { success: false, error: "Entity not found" },
        { status: 404 }
      );
    }

    // 4. Check for duplicate open report from same user
    const existingReport = await prisma.report.findFirst({
      where: {
        reportedById: session.user.id,
        entityType,
        entityId,
        status: "PENDING",
      },
    });

    if (existingReport) {
      return NextResponse.json(
        { success: false, error: "Report already submitted" },
        { status: 409 }
      );
    }

    // 5. Create report + audit log together
    await prisma.$transaction([
      prisma.report.create({
        data: {
          reportedById: session.user.id,
          entityType,
          entityId,
          reason,
        },
      }),
      prisma.auditLog.create({
        data: {
          userId: session.user.id,
          action: "SUBMIT_REPORT",
          entityType,
          entityId,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Report submitted successfully",
    });
  } catch (err) {
    console.error("POST /api/v1/reports error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}