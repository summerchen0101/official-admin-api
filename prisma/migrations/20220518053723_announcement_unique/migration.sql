/*
  Warnings:

  - A unique constraint covering the columns `[title,start_at]` on the table `Announcement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Announcement_title_start_at_key" ON "Announcement"("title", "start_at");
