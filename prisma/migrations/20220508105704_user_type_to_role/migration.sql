/*
  Warnings:

  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "type",
ADD COLUMN     "role" "RoleType" NOT NULL DEFAULT E'USER';
