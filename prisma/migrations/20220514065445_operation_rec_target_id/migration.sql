/*
  Warnings:

  - You are about to drop the column `params` on the `OperationRec` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OperationRec" DROP COLUMN "params",
ADD COLUMN     "target_id" TEXT;
