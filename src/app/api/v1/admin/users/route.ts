// src/app/api/v1/admin/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/permissions";

const VALID_STATUSES = ["ACTIVE", "SUSPENDED", "DELETED"];
const VALID_ROLES = ["USER", "ADMIN", "SUPER_ADMIN"];

export async function GET(req: NextRequest) {
  try {
    // 1. Auth + role check
    const { error } = await requireAdmin();
    if (error === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    if (error === "FORBIDDEN") {
      return NextResponse.json({ success: false, message: "Insufficient Role" }, { status: 403 });
    }

    // 2. Parse & validate query params
    const { searchParams } = req.nextUrl;

    const pageRaw = searchParams.get("page") ?? "1";
    const limitRaw = searchParams.get("limit") ?? "20";
    const search = searchParams.get("search") ?? undefined;
    const status = searchParams.get("status") ?? undefined;
    const role = searchParams.get("role") ?? undefined;

    const page = parseInt(pageRaw, 10);
    const limit = parseInt(limitRaw, 10);

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        { success: false, message: "Invalid Query Params" },
        { status: 400 }
      );
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid Query Params" },
        { status: 400 }
      );
    }

    if (role && !VALID_ROLES.includes(role)) {
      return NextResponse.json(
        { success: false, message: "Invalid Query Params" },
        { status: 400 }
      );
    }

    // 3. Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { username: { contains: search, mode: "insensitive" } },
      ];
    }
    if (status) where.status = status;
    if (role) where.role = role;

    // 4. Query DB
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
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
      prisma.user.count({ where }),
    ]);

    // 5. Shape response
    const shaped = users.map((u) => ({
      id: u.id,
      fullName: u.name,
      email: u.email,
      role: u.role,
      status: u.status,
      isVerified: u.emailVerified,
      createdAt: u.createdAt,
    }));

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
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}