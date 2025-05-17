import { prisma } from "@/prisma";
import CreateExerciseButton from "@/src/components/pages/exercise/CreateExerciseButton/CreateExerciseButton";
import NextExerciseLink from "@/src/components/pages/exercise/NextExerciseLink/NextExerciseLink";
import { ExerciseRepository } from "@/src/repositories/ExerciseRepository";
import { WorkoutRepository } from "@/src/repositories/WorkoutRepository";
import { ExerciseService } from "@/src/services/ExerciseService";
import type { Exercise } from "@/src/services/ExerciseService";

export default async function NextExercise({
  props,
}: {
  props: {
    year: number;
    month: number;
    day: number;
    nowExercise: Exercise;
  };
}) {
  const { year, month, day, nowExercise } = props;

  const exerciseRepository = new ExerciseRepository(prisma);
  const workoutRepository = new WorkoutRepository(prisma);
  const exerciseService = new ExerciseService(
    workoutRepository,
    exerciseRepository,
  );
  const nextExercise: Exercise | null = await exerciseService.getExerciseOrNull(
    year,
    month,
    day,
    nowExercise.order + 1,
  );

  return (
    <div>
      {nextExercise ? (
        <NextExerciseLink
          props={{ year, month, day, order: nextExercise.order }}
        />
      ) : (
        <CreateExerciseButton
          props={{ year, month, day, order: nowExercise.order + 1 }}
        />
      )}
    </div>
  );
}
