/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `rep` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workoutId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_updatedBy_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "createdAt",
DROP COLUMN "createdBy",
DROP COLUMN "date",
DROP COLUMN "rep",
DROP COLUMN "updatedAt",
DROP COLUMN "updatedBy",
DROP COLUMN "weight",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "workoutId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" SERIAL NOT NULL,
    "rep" INTEGER NOT NULL,
    "weight" VARCHAR(255) NOT NULL,
    "order" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rest" (
    "id" SERIAL NOT NULL,
    "time" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "Rest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rest" ADD CONSTRAINT "Rest_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
