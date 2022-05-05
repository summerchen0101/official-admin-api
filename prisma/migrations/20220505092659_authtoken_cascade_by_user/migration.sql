-- DropForeignKey
ALTER TABLE "AuthToken" DROP CONSTRAINT "AuthToken_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "AuthToken" ADD CONSTRAINT "AuthToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
