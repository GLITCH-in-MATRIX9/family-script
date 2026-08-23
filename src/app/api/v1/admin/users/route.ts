// src/app/api/v1/admin/users/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/permissions";

const VALID_STATUSES = ["ACTIVE", "SUSPENDED", "DELETED"] as const;
const VALID_ROLES = ["USER", "ADMIN", "SUPER_ADMIN"] as const;

type UserStatus = (typeof VALID_STATUSES)[number];
type UserRole = (typeof VALID_ROLES)[number];

export async function GET(req: NextRequest) {
  try {
    // 1. Auth + role check
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

    // 2. Parse query parameters
    const { searchParams } = req.nextUrl;

    const pageRaw = searchParams.get("page") ?? "1";
    const limitRaw = searchParams.get("limit") ?? "20";
    const search = searchParams.get("search") ?? undefined;
    const status = searchParams.get("status") ?? undefined;
    const role = searchParams.get("role") ?? undefined;

    const page = parseInt(pageRaw, 10);
    const limit = parseInt(limitRaw, 10);

    // 3. Validate pagination
    if (
      isNaN(page) ||
      page < 1 ||
      isNaN(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Query Params",
        },
        { status: 400 }
      );
    }

    // 4. Validate status
    if (
      status &&
      !VALID_STATUSES.includes(status as UserStatus)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Query Params",
        },
        { status: 400 }
      );
    }

    // 5. Validate role
    if (
      role &&
      !VALID_ROLES.includes(role as UserRole)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Query Params",
        },
        { status: 400 }
      );
    }

    // 6. Build Prisma where clause
    const where: Prisma.UserWhereInput = {};

    // Search by name, email, or username
    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          username: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    // Filter by status
    if (status) {
      where.status = status as Prisma.UserWhereInput["status"];
    }

    // Filter by role
    if (role) {
      where.role = role as Prisma.UserWhereInput["role"];
    }

    // 7. Query database
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          emailVerified: true,
          createdAt: true,
        },
      }),

      prisma.user.count({
        where,
      }),
    ]);

    // 8. Shape response
    const shaped = users.map((user) => ({
      id: user.id,
      fullName: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      isVerified: user.emailVerified,
      createdAt: user.createdAt,
    }));

    // 9. Return response
    return NextResponse.json({
      success: true,
      data: {
        users: shaped,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("[ADMIN_USERS_GET]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}