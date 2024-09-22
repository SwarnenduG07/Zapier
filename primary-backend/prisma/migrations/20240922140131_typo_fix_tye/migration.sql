/*
  Warnings:

  - You are about to drop the column `resetTokens` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetTokens",
ADD COLUMN     "resetToken" TEXT;
