/*
  Warnings:

  - You are about to drop the column `reqPath` on the `OperationRec` table. All the data in the column will be lost.
  - You are about to drop the column `resData` on the `OperationRec` table. All the data in the column will be lost.
  - You are about to drop the column `route` on the `OperationRec` table. All the data in the column will be lost.
  - Added the required column `path` to the `OperationRec` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OperationRec" DROP COLUMN "reqPath",
DROP COLUMN "resData",
DROP COLUMN "route",
ADD COLUMN     "params" JSONB,
ADD COLUMN     "path" TEXT NOT NULL;
