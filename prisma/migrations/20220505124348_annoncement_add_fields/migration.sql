-- AlterTable
ALTER TABLE "Announcement" ADD COLUMN     "is_new_win" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "platform" "Platform" NOT NULL DEFAULT E'ALL',
ADD COLUMN     "sort" SERIAL NOT NULL;
