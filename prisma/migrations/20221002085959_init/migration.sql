/*
  Warnings:

  - You are about to drop the `expense_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "ParticipantsInExpense" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "expense_info";
