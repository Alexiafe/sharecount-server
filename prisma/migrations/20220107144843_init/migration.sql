-- CreateTable
CREATE TABLE "sharecount" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sharecount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount_total" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sharecount_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sharecount_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense_info" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "expense_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_info_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_sharecount_id_fkey" FOREIGN KEY ("sharecount_id") REFERENCES "sharecount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participant" ADD CONSTRAINT "participant_sharecount_id_fkey" FOREIGN KEY ("sharecount_id") REFERENCES "sharecount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_info" ADD CONSTRAINT "expense_info_expense_id_fkey" FOREIGN KEY ("expense_id") REFERENCES "expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;
