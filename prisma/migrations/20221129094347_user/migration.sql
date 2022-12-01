/*
  Warnings:

  - You are about to drop the column `user_email` on the `sharecount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sharecount" DROP COLUMN "user_email";

-- CreateTable
CREATE TABLE "UserInSharecount" (
    "sharecount_id" INTEGER NOT NULL,
    "user_email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "participantId" INTEGER NOT NULL,

    CONSTRAINT "UserInSharecount_pkey" PRIMARY KEY ("sharecount_id","user_email")
);
