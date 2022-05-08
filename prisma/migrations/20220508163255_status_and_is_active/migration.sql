/*
  Warnings:

  - You are about to drop the column `status` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "status",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "Status";

-- DropEnum
DROP TYPE "UserStatus";
