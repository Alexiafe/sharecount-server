/*
  Warnings:

  - Made the column `sharecount_id` on table `expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `owner_id` on table `expense` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `participant_id` to the `expense_info` table without a default value. This is not possible if the table is not empty.
  - Made the column `expense_id` on table `expense_info` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sharecount_id` on table `participant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "expense" ALTER COLUMN "sharecount_id" SET NOT NULL,
ALTER COLUMN "owner_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "expense_info" ADD COLUMN     "participant_id" INTEGER NOT NULL,
ALTER COLUMN "expense_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "participant" ALTER COLUMN "sharecount_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "ParticipantsInExpense" (
    "expense_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "ParticipantsInExpense_pkey" PRIMARY KEY ("expense_id","participant_id")
);
