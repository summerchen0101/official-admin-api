-- AlterTable
ALTER TABLE "EventGroup" ADD COLUMN     "event_expo_id" TEXT;

-- CreateTable
CREATE TABLE "EventExpo" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "EventExpo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventExpo_code_key" ON "EventExpo"("code");

-- AddForeignKey
ALTER TABLE "EventGroup" ADD CONSTRAINT "EventGroup_event_expo_id_fkey" FOREIGN KEY ("event_expo_id") REFERENCES "EventExpo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
