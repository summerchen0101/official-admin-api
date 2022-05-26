/*
  Warnings:

  - You are about to drop the column `info` on the `EventGroup` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "EventType" ADD VALUE 'INFO';

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "tab_active_img" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "tab_img" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "EventGroup" DROP COLUMN "info",
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT E'';
