-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_event_group_id_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "event_group_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_event_group_id_fkey" FOREIGN KEY ("event_group_id") REFERENCES "EventGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
