// src/app/api/v1/admin/users/[userId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/permissions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // 1. Authentication + admin role check
    const { error } = await requireAdmin();

    if (error === "UNAUTHORIZED") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    if (error === "FORBIDDEN") {
      return NextResponse.json(
        {
          success: false,
          message: "Insufficient Role",
        },
        { status: 403 }
      );
    }

    // 2. Get userId from dynamic route params
    const { userId } = await params;

    // 3. Validate userId
    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid User ID",
        },
        { status: 400 }
      );
    }

    // 4. Find user
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        avatarUrl: true,
        createdAt: true,

        sessions: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          select: {
            createdAt: true,
          },
        },
      },
    });

    // 5. User not found
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }

    // 6. Return user details
    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        fullName: user.name,
        email: user.email,
        isVerified: user.emailVerified,
        profilePhoto: user.avatarUrl ?? null,
        createdAt: user.createdAt,
        lastLoginAt: user.sessions[0]?.createdAt ?? null,
      },
    });
  } catch (error) {
    console.error("[ADMIN_USER_GET_BY_ID]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}