-- CreateEnum
CREATE TYPE "AnnouncementType" AS ENUM ('GAME', 'OPERATION', 'EVENT', 'SERVICE');

-- CreateTable
CREATE TABLE "Announcement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "start_at" TIMESTAMP(3),
    "end_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "type" "AnnouncementType" NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);
