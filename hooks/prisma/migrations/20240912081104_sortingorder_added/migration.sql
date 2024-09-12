/*
  Warnings:

  - You are about to drop the column `sortringOrder` on the `Trigger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "sortringOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "sortringOrder";
