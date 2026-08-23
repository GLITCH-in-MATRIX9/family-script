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

    // 2. Parse request body
    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Error",
        },
        { status: 400 }
      );
    }

    // 3. Validate that body is a plain object
    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Error",
        },
        { status: 400 }
      );
    }

    // At this point body is safely treated as an object
    const bodyObject = body as Record<string, unknown>;

    // 4. Validate fields — only allowed keys, only booleans
    const updateData: Partial<Record<SettingsField, boolean>> = {};

    for (const key of Object.keys(bodyObject)) {
      // Check whether the field is allowed
      if (!ALLOWED_FIELDS.includes(key as SettingsField)) {
        return NextResponse.json(
          {
            success: false,
            message: "Validation Error",
          },
          { status: 400 }
        );
      }

      const value = bodyObject[key];

      // Every setting must be a boolean
      if (typeof value !== "boolean") {
        return NextResponse.json(
          {
            success: false,
            message: "Validation Error",
          },
          { status: 400 }
        );
      }

      updateData[key as SettingsField] = value;
    }

    // 5. At least one field is required
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No Fields Provided",
        },
        { status: 400 }
      );
    }

    // 6. Apply partial update
    // Upsert because the settings row may not exist yet
    await prisma.platformSettings.upsert({
      where: {
        id: SETTINGS_ID,
      },
      create: {
        id: SETTINGS_ID,
        ...updateData,
      },
      update: {
        ...updateData,
      },
    });

    // 7. Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session!.user.id,
        action: "UPDATE_PLATFORM_SETTINGS",
        entityType: "PlatformSettings",
        entityId: SETTINGS_ID,
        metadata: updateData,
      },
    });

    // 8. Return success response
    return NextResponse.json({
      success: true,
      message: "Platform settings updated",
    });
  } catch (error) {
    console.error("[ADMIN_SETTINGS_PATCH]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}