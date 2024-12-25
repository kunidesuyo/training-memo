/*
  Warnings:

  - You are about to drop the column `date` on the `Workout` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[year,month,day,authorId]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `day` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "date",
ADD COLUMN     "day" INTEGER NOT NULL,
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Workout_year_month_day_authorId_key" ON "Workout"("year", "month", "day", "authorId");
