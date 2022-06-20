-- AlterEnum
ALTER TYPE "EventType" ADD VALUE 'CUSTOM_TABLE';

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "custom_tables" JSONB;
