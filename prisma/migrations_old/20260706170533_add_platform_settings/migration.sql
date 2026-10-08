-- CreateTable
CREATE TABLE "platform_settings" (
    "id" TEXT NOT NULL DEFAULT 'platform_settings',
    "registrationsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "familyTreeCreationEnabled" BOOLEAN NOT NULL DEFAULT true,
    "ecommerceEnabled" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "platform_settings_pkey" PRIMARY KEY ("id")
);
