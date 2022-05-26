/*
  Warnings:

  - You are about to drop the column `recharge` on the `Event` table. All the data in the column will be lost.
  - Added the required column `target` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "recharge",
ADD COLUMN     "recharges" JSONB,
ADD COLUMN     "target" TEXT NOT NULL;
