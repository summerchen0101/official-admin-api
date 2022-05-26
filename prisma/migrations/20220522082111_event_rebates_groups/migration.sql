/*
  Warnings:

  - You are about to drop the column `comlex` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "comlex",
ADD COLUMN     "groups" JSONB,
ADD COLUMN     "rebates" JSONB;
