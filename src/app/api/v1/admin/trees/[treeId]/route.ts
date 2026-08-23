// src/app/api/v1/admin/trees/[treeId]/route.ts

import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/permissions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ treeId: string }> },
) {
  try {
    // --------------------------------------------------
    // 1. Check authentication and admin authorization
    // --------------------------------------------------
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

    // --------------------------------------------------
    // 2. Get treeId from dynamic route
    // --------------------------------------------------
    const { treeId } = await params;

    // --------------------------------------------------
    // 3. Fetch tree and related counts
    // --------------------------------------------------
    const tree = await prisma.tree.findUnique({
      where: {
        id: treeId,
      },

      select: {
        id: true,
        name: true,
        type: true,
        visibility: true,
        ownerId: true,
        createdAt: true,

        _count: {
          select: {
            members: true,
            nodes: true,
          },
        },
      },
    });

    // --------------------------------------------------
    // 4. Tree not found
    // --------------------------------------------------
    if (!tree) {
      return NextResponse.json(
        {
          success: false,
          error: "Tree not found",
        },
        { status: 404 },
      );
    }

    // --------------------------------------------------
    // 5. Convert visibility into isPublic
    //
    // Prisma has:
    // visibility: PUBLIC | PRIVATE
    //
    // The old API expected:
    // isPublic: boolean
    // --------------------------------------------------
    const data = {
      id: tree.id,
      name: tree.name,
      type: tree.type,
      ownerId: tree.ownerId,
      isPublic: tree.visibility === "PUBLIC",
      visibility: tree.visibility,
      memberCount: tree._count.members,
      nodeCount: tree._count.nodes,
      createdAt: tree.createdAt,
    };

    // --------------------------------------------------
    // 6. Return response
    // --------------------------------------------------
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(
      "GET /api/v1/admin/trees/[treeId] error:",
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