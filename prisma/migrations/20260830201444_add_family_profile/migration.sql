-- CreateTable
CREATE TABLE "family_profiles" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "occupation" TEXT,
    "bloodGroup" VARCHAR(10),
    "currentLocation" TEXT,
    "nativePlace" TEXT,
    "marriageDate" TIMESTAMP(3),
    "hereditaryDisorders" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "family_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "family_profiles_nodeId_key" ON "family_profiles"("nodeId");

-- AddForeignKey
ALTER TABLE "family_profiles" ADD CONSTRAINT "family_profiles_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "tree_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
