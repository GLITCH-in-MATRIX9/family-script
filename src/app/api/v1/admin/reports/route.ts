import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth" // adjust to wherever your Better Auth instance is exported
import { prisma } from "@/lib/prisma"; // adjust to your Prisma client singleton
import { getReportsQuerySchema } from "@/lib/validations/report";

export async function GET(request: NextRequest) {
  try {
    // 1. Get the session from Better Auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Check role — this endpoint is SUPER_ADMIN only
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, error: "Insufficient role" },
        { status: 403 }
      );
    }

    // 3. Parse and validate query params
    const { searchParams } = new URL(request.url);
    const parsed = getReportsQuerySchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      status: searchParams.get("status") ?? undefined,
      entityType: searchParams.get("entityType") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid Query Params", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { page, limit, status, entityType } = parsed.data;

    // 4. Build the Prisma "where" clause dynamically based on filters
    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (entityType) where.entityType = entityType;

    // 5. Run the count and the paginated query together
    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.report.count({ where }),
    ]);

    // 6. Return the response in the exact shape the spec wants
    return NextResponse.json({
      success: true,
      data: {
        reports: reports.map((r) => ({
          id: r.id,
          reportedBy: r.reportedById,
          entityType: r.entityType,
          entityId: r.entityId,
          reason: r.reason,
          status: r.status,
          createdAt: r.createdAt.toISOString(),
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("GET /api/v1/admin/reports error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}