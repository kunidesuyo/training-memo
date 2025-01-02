/*
  Warnings:

  - You are about to drop the `Rest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Set` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ExerciseItemType" AS ENUM ('SET', 'REST');

-- DropForeignKey
ALTER TABLE "Rest" DROP CONSTRAINT "Rest_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_exerciseId_fkey";

-- DropTable
DROP TABLE "Rest";

-- DropTable
DROP TABLE "Set";

-- CreateTable
CREATE TABLE "ExerciseItem" (
    "id" SERIAL NOT NULL,
    "type" "ExerciseItemType" NOT NULL,
    "weight" INTEGER,
    "rep" INTEGER,
    "time" INTEGER,
    "order" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "ExerciseItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseItem" ADD CONSTRAINT "ExerciseItem_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseItem" ADD CONSTRAINT "ExerciseItem_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
