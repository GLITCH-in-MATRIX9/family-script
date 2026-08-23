
import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ relationshipId: string }> },
) {
  try {
    // Check that the requester is authenticated and has admin access.
    const { error } = await requireAdmin();

    if (error === "UNAUTHORIZED") {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    if (error === "FORBIDDEN") {
      return NextResponse.json(
        {
          success: false,
          error: "Insufficient role",
        },
        { status: 403 },
      );
    }

    // Get the relationship ID from the dynamic route.
    const { relationshipId } = await params;

    // Find the relationship and fetch the required information
    // from both connected TreeNode records.
    const relationship = await prisma.relationship.findUnique({
      where: {
        id: relationshipId,
      },
      include: {
        sourceNode: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
            displayName: true,
          },
        },
        targetNode: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
            displayName: true,
          },
        },
      },
    });

    // Return 404 if the relationship does not exist.
    if (!relationship) {
      return NextResponse.json(
        {
          success: false,
          error: "Relationship not found",
        },
        { status: 404 },
      );
    }

    // Use displayName when available.
    // Otherwise construct a name from the person's name fields.
    const getNodeName = (node: {
      displayName: string | null;
      firstName: string;
      middleName: string | null;
      lastName: string;
    }) => {
      if (node.displayName?.trim()) {
        return node.displayName;
      }

      return [
        node.firstName,
        node.middleName,
        node.lastName,
      ]
        .filter(Boolean)
        .join(" ");
    };

    const sourceNodeName = getNodeName(relationship.sourceNode);
    const targetNodeName = getNodeName(relationship.targetNode);

    return NextResponse.json({
      success: true,
      data: {
        id: relationship.id,

        sourceNodeId: relationship.sourceNodeId,
        sourceNodeName,

        targetNodeId: relationship.targetNodeId,
        targetNodeName,

        type: relationship.type,
        createdAt: relationship.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "GET /api/v1/admin/relationships/[relationshipId] error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}