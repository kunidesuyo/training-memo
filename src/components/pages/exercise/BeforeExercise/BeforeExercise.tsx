import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma";
import { ExerciseRepository } from "@/src/repositories/ExerciseRepository";
import { WorkoutRepository } from "@/src/repositories/WorkoutRepository";
import type { Exercise } from "@/src/services/ExerciseService";
import { ExerciseService } from "@/src/services/ExerciseService";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function BeforeExercise({
  props,
}: {
  props: { year: number; month: number; day: number; nowExerciseOrder: number };
}) {
  const { year, month, day, nowExerciseOrder } = props;
  const beforeExerciseOrder = nowExerciseOrder - 1;

  const exerciseRepository = new ExerciseRepository(prisma);
  const workoutRepository = new WorkoutRepository(prisma);
  const exerciseService = new ExerciseService(
    workoutRepository,
    exerciseRepository,
  );
  const exercise: Exercise | null = await exerciseService.getExerciseOrNull(
    year,
    month,
    day,
    beforeExerciseOrder,
  );
  return (
    <div>
      {exercise ? (
        <div>
          <Link
            href={`/workouts/${year}/${month}/${day}/exercise/${beforeExerciseOrder}`}
          >
            <Button variant="ghost" className="hover:bg-transparent">
              <ChevronLeft className="w-5 h-5 text-sky-500" />
            </Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
