/*
  Warnings:

  - You are about to drop the column `resetToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetToken",
ADD COLUMN     "resetTokens" TEXT;
