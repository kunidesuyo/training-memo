-- DropForeignKey
ALTER TABLE "ExerciseItem" DROP CONSTRAINT "ExerciseItem_exerciseId_fkey";

-- AddForeignKey
ALTER TABLE "ExerciseItem" ADD CONSTRAINT "ExerciseItem_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
