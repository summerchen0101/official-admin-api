/*
  Warnings:

  - You are about to drop the column `banner` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `EventSection` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_group_id` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('NORMAL');

-- DropForeignKey
ALTER TABLE "EventSection" DROP CONSTRAINT "EventSection_event_id_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "banner",
DROP COLUMN "desc",
DROP COLUMN "name",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "end_at" TIMESTAMP,
ADD COLUMN     "event_group_id" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sort" SERIAL NOT NULL,
ADD COLUMN     "start_at" TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" "EventType" NOT NULL;

-- DropTable
DROP TABLE "EventSection";

-- CreateTable
CREATE TABLE "EventGroup" (
    "id" TEXT NOT NULL,
    "banner" TEXT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "info" TEXT,
    "url" TEXT,
    "platform" "Platform" NOT NULL DEFAULT E'ALL',

    CONSTRAINT "EventGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventGroup_code_key" ON "EventGroup"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Event_code_key" ON "Event"("code");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_event_group_id_fkey" FOREIGN KEY ("event_group_id") REFERENCES "EventGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
