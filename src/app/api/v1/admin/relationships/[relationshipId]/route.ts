import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ relationshipId: string }> }
) {
  try {
    const { error } = await requireAdmin();

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

    const { relationshipId } = await params;

    const relationship = await prisma.relationship.findUnique({
      where: { id: relationshipId },
      include: {
        sourceNode: { select: { id: true, name: true } },
        targetNode: { select: { id: true, name: true } },
      },
    });

    if (!relationship) {
      return NextResponse.json(
        { success: false, error: "Relationship not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: relationship.id,
        sourceNodeId: relationship.sourceNodeId,
        sourceNodeName: relationship.sourceNode.name,
        targetNodeId: relationship.targetNodeId,
        targetNodeName: relationship.targetNode.name,
        type: relationship.type,
        createdAt: relationship.createdAt,
      },
    });
  } catch (err) {
    console.error("GET /api/v1/admin/relationships/[relationshipId] error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}