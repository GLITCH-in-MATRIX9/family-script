import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/permissions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ treeId: string }> }
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

  try {
    const { treeId } = await params;

    // 2. Fetch tree with related counts in a single query
    const tree = await prisma.tree.findUnique({
      where: { id: treeId },
      select: {
        id: true,
        name: true,
        type: true,
        ownerId: true,
        isPublic: true,
        createdAt: true,
        _count: {
          select: {
            members: true,
            nodes: true,
          },
        },
      },
    });

    // 3. Handle not found
    if (!tree) {
      return NextResponse.json(
        { success: false, error: "Tree not found" },
        { status: 404 }
      );
    }

    // 4. Map to response shape
    const data = {
      id: tree.id,
      name: tree.name,
      type: tree.type,
      ownerId: tree.ownerId,
      isPublic: tree.isPublic,
      memberCount: tree._count.members,
      nodeCount: tree._count.nodes,
      createdAt: tree.createdAt,
    };

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("GET /api/v1/admin/trees/[treeId] error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}