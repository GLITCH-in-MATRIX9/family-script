-- CreateTable
CREATE TABLE "organization_profiles" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "designation" TEXT,
    "joiningDate" TIMESTAMP(3),
    "retirementDate" TIMESTAMP(3),
    "accolades" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tribe_profiles" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "friendshipDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tribe_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_profiles_nodeId_key" ON "organization_profiles"("nodeId");

-- CreateIndex
CREATE UNIQUE INDEX "tribe_profiles_nodeId_key" ON "tribe_profiles"("nodeId");

-- AddForeignKey
ALTER TABLE "organization_profiles" ADD CONSTRAINT "organization_profiles_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "tree_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tribe_profiles" ADD CONSTRAINT "tribe_profiles_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "tree_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
