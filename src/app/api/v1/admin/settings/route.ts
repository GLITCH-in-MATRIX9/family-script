// src/app/api/v1/admin/settings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/auth/permissions";

const SETTINGS_ID = "platform_settings";

const ALLOWED_FIELDS = [
  "registrationsEnabled",
  "familyTreeCreationEnabled",
  "ecommerceEnabled",
] as const;

type SettingsField = (typeof ALLOWED_FIELDS)[number];

export async function PATCH(req: NextRequest) {
  try {
    // 1. Auth + role check — SUPER_ADMIN only
    const { error, session } = await requireSuperAdmin();
    if (error === "UNAUTHORIZED") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    if (error === "FORBIDDEN") {
      return NextResponse.json(
        { success: false, message: "Insufficient Role" },
        { status: 403 }
      );
    }

    // 2. Parse body
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Validation Error" },
        { status: 400 }
      );
    }

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, message: "Validation Error" },
        { status: 400 }
      );
    }

    // 3. Validate fields — only allowed keys, only booleans
    const updateData: Partial<Record<SettingsField, boolean>> = {};

    for (const key of Object.keys(body)) {
      if (!ALLOWED_FIELDS.includes(key as SettingsField)) {
        return NextResponse.json(
          { success: false, message: "Validation Error" },
          { status: 400 }
        );
      }
      const value = body[key];
      if (typeof value !== "boolean") {
        return NextResponse.json(
          { success: false, message: "Validation Error" },
          { status: 400 }
        );
      }
      updateData[key as SettingsField] = value;
    }

    // 4. At least one field required
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "No Fields Provided" },
        { status: 400 }
      );
    }

    // 5. Apply partial update — upsert since the row may not exist yet
    await prisma.platformSettings.upsert({
      where: { id: SETTINGS_ID },
      create: { id: SETTINGS_ID, ...updateData },
      update: { ...updateData },
    });

    // 6. Audit log
    await prisma.auditLog.create({
      data: {
        userId: session!.user.id,
        action: "UPDATE_PLATFORM_SETTINGS",
        entityType: "PlatformSettings",
        entityId: SETTINGS_ID,
        metadata: updateData,
      },
    });

    // 7. Response
    return NextResponse.json({
      success: true,
      message: "Platform settings updated",
    });
  } catch (error) {
    console.error("[ADMIN_SETTINGS_PATCH]", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}