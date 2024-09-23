/*
  Warnings:

  - A unique constraint covering the columns `[zapRunId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transaction_zapRunId_key" ON "Transaction"("zapRunId");
