/*
  Warnings:

  - You are about to drop the column `type` on the `Event` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EventType" ADD VALUE 'LEVEL_PRIZE';
ALTER TYPE "EventType" ADD VALUE 'GAME_REBATE';
ALTER TYPE "EventType" ADD VALUE 'RECHARGE_PRIZE';

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "type",
ADD COLUMN     "comlex" JSONB;
