/*
  Warnings:

  - The values [SET] on the enum `ExerciseItemType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExerciseItemType_new" AS ENUM ('WORK', 'REST');
ALTER TABLE "ExerciseItem" ALTER COLUMN "type" TYPE "ExerciseItemType_new" USING ("type"::text::"ExerciseItemType_new");
ALTER TYPE "ExerciseItemType" RENAME TO "ExerciseItemType_old";
ALTER TYPE "ExerciseItemType_new" RENAME TO "ExerciseItemType";
DROP TYPE "ExerciseItemType_old";
COMMIT;
