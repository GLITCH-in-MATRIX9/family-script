// src/app/api/v1/admin/nodes/[nodeId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/permissions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ nodeId: string }> }
) {
  try {
    // 1. Check the requester is logged in AND is an admin
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

    // 2. Get nodeId from the dynamic route segment
    const { nodeId } = await params;

    // 3. Query the database for this node
    const node = await prisma.treeNode.findUnique({
      where: { id: nodeId },
    });

    // 4. If nothing found, return 404
    if (!node) {
      return NextResponse.json(
        { success: false, error: "Node not found" },
        { status: 404 }
      );
    }

    // 5. Shape the response manually to match the spec exactly
    return NextResponse.json({
      success: true,
      data: {
        id: node.id,
        treeId: node.treeId,
        name: node.name,
        photo: node.photo,
        currentLocation: node.currentLocation,
        nativePlace: node.nativePlace,
        dateOfBirth: node.dateOfBirth,
        dateOfMarriage: node.dateOfMarriage,
        dateOfDemise: node.dateOfDemise,
        occupation: node.occupation,
        bloodGroup: node.bloodGroup,
        hereditaryDisorders: node.hereditaryDisorders,
        notes: node.notes,
        linkedUserId: node.linkedUserId,
        createdAt: node.createdAt,
      },
    });
  } catch (err) {
    console.error("GET /api/v1/admin/nodes/[nodeId] error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}