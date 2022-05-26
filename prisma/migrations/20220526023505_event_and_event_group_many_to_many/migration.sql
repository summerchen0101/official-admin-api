/*
  Warnings:

  - You are about to drop the column `event_group_id` on the `Event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_event_group_id_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "event_group_id";

-- CreateTable
CREATE TABLE "_EventToEventGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventGroup_AB_unique" ON "_EventToEventGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventGroup_B_index" ON "_EventToEventGroup"("B");

-- AddForeignKey
ALTER TABLE "_EventToEventGroup" ADD CONSTRAINT "_EventToEventGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventGroup" ADD CONSTRAINT "_EventToEventGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "EventGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
