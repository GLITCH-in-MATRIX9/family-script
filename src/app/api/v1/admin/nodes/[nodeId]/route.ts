// src/app/api/v1/admin/nodes/[nodeId]/route.ts

import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/permissions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ nodeId: string }> },
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

    // Get the dynamic route parameter.
    const { nodeId } = await params;

    // Find the requested tree node.
    const node = await prisma.treeNode.findUnique({
      where: {
        id: nodeId,
      },
    });

    // Return 404 if the node does not exist.
    if (!node) {
      return NextResponse.json(
        {
          success: false,
          error: "Node not found",
        },
        { status: 404 },
      );
    }

    // Return only fields that actually exist in the Prisma TreeNode model.
    return NextResponse.json({
      success: true,
      data: {
        id: node.id,
        treeId: node.treeId,

        // Identity
        firstName: node.firstName,
        middleName: node.middleName,
        lastName: node.lastName,
        maidenName: node.maidenName,
        displayName: node.displayName,
        nickname: node.nickname,

        // Personal details
        gender: node.gender,
        birthDate: node.birthDate,
        birthPlace: node.birthPlace,
        deathDate: node.deathDate,
        deathPlace: node.deathPlace,
        isLiving: node.isLiving,

        // Additional information
        bio: node.bio,
        avatarUrl: node.avatarUrl,
        metadata: node.metadata,

        // Linked platform user
        linkedUserId: node.linkedUserId,

        // Audit fields
        createdAt: node.createdAt,
        updatedAt: node.updatedAt,
        deletedAt: node.deletedAt,
      },
    });
  } catch (error) {
    console.error(
      "GET /api/v1/admin/nodes/[nodeId] error:",
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