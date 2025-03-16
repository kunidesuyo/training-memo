/*
  Warnings:

  - A unique constraint covering the columns `[workoutId,order]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Exercise_workoutId_order_key" ON "Exercise"("workoutId", "order");
