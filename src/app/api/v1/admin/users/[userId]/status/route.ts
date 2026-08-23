// src/app/api/v1/admin/users/[userId]/status/route.ts

import { NextRequest, NextResponse } from "next/server";
import { UserStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/permissions";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    // --------------------------------------------------
    // 1. Check authentication and admin authorization
    // --------------------------------------------------
    const { error, session } = await requireAdmin();

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
    // 2. Get userId from dynamic route
    // --------------------------------------------------
    const { userId } = await params;

    // --------------------------------------------------
    // 3. Read request body
    // --------------------------------------------------
    const body = await req.json();
    const { status } = body;

    // --------------------------------------------------
    // 4. Validate status
    // --------------------------------------------------
    const allowedStatuses: UserStatus[] = [
      UserStatus.ACTIVE,
      UserStatus.SUSPENDED,
    ];

    if (
      typeof status !== "string" ||
      !allowedStatuses.includes(status as UserStatus)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Status Value",
        },
        { status: 400 },
      );
    }

    // Convert the validated string into Prisma's enum type
    const newStatus = status as UserStatus;

    // --------------------------------------------------
    // 5. Check whether user exists
    // --------------------------------------------------
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 },
      );
    }

    // --------------------------------------------------
    // 6. Update user status and create audit log
    // --------------------------------------------------
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          id: userId,
        },
        data: {
          status: newStatus,
        },
      });

      // If the user is suspended, invalidate all sessions
      if (newStatus === UserStatus.SUSPENDED) {
        await tx.session.deleteMany({
          where: {
            userId,
          },
        });
      }

      // Create audit log
      await tx.auditLog.create({
        data: {
          userId: session?.user?.id ?? null,
          action: "UPDATE_USER_STATUS",
          entityType: "User",
          entityId: userId,
          metadata: {
            previousStatus: user.status,
            newStatus,
          },
        },
      });
    });

    // --------------------------------------------------
    // 7. Success response
    // --------------------------------------------------
    return NextResponse.json({
      success: true,
      message: "User status updated",
    });
  } catch (error) {
    console.error(
      "[ADMIN_USER_UPDATE_STATUS]",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}