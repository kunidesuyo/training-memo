/*
  Warnings:

  - You are about to drop the `ExerciseItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseItem" DROP CONSTRAINT "ExerciseItem_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseItem" DROP CONSTRAINT "ExerciseItem_exerciseId_fkey";

-- DropTable
DROP TABLE "ExerciseItem";

-- DropEnum
DROP TYPE "ExerciseItemType";

-- CreateTable
CREATE TABLE "WorkExerciseItem" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "rep" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "WorkExerciseItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestExerciseItem" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "RestExerciseItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkExerciseItem" ADD CONSTRAINT "WorkExerciseItem_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExerciseItem" ADD CONSTRAINT "WorkExerciseItem_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestExerciseItem" ADD CONSTRAINT "RestExerciseItem_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestExerciseItem" ADD CONSTRAINT "RestExerciseItem_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
