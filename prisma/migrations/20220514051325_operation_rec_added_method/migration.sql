/*
  Warnings:

  - Added the required column `method` to the `OperationRec` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OperationRec" ADD COLUMN     "method" TEXT NOT NULL;
