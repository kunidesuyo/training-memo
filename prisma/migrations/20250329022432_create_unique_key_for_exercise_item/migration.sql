/*
  Warnings:

  - A unique constraint covering the columns `[exerciseId,order]` on the table `RestExerciseItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[exerciseId,order]` on the table `WorkExerciseItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RestExerciseItem_exerciseId_order_key" ON "RestExerciseItem"("exerciseId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "WorkExerciseItem_exerciseId_order_key" ON "WorkExerciseItem"("exerciseId", "order");
