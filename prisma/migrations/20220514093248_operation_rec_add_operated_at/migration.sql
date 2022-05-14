/*
  Warnings:

  - You are about to drop the column `created_at` on the `OperationRec` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `OperationRec` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OperationRec" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "operated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
