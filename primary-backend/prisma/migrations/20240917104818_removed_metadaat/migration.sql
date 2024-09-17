/*
  Warnings:

  - You are about to drop the column `metadata` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `Trigger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "metadata";

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "metadata";
