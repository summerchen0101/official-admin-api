-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "banner" TEXT,
    "name" TEXT NOT NULL,
    "desc" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,

    CONSTRAINT "EventSection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventSection" ADD CONSTRAINT "EventSection_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
