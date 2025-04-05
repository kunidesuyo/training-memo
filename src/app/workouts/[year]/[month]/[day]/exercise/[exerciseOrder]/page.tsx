import { prisma } from "@/prisma";
import ExerciseForm from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/ExerciseForm";
import { ExerciseRepository } from "@/src/repositories/ExerciseRepository";
import { WorkoutRepository } from "@/src/repositories/WorkoutRepository";
import { ExerciseService } from "@/src/services/ExerciseService";
import type { Exercise } from "@/src/services/ExerciseService";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { year: string; month: string; day: string; exerciseOrder: string };
}) {
  // 認証チェック
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const { year, month, day, exerciseOrder } = await params;

  const exerciseRepository = new ExerciseRepository(prisma);
  const workoutRepository = new WorkoutRepository(prisma);
  const exerciseService = new ExerciseService(
    workoutRepository,
    exerciseRepository,
  );
  const exercise: Exercise = await exerciseService.getExercise(
    Number.parseInt(year),
    Number.parseInt(month),
    Number.parseInt(day),
    Number.parseInt(exerciseOrder),
  );

  return (
    <div className="m-4">
      <Link className="m-4" href={`/workouts/${year}/${month}/${day}`}>
        戻る
      </Link>
      <h2 className="text-2xl font-bold text-gray-800 m-4 pb-2 border-b border-gray-200">
        {exercise.name}
      </h2>
      <div className="m-4">
        <ExerciseForm
          exercise={exercise}
          year={Number.parseInt(year)}
          month={Number.parseInt(month)}
          day={Number.parseInt(day)}
          exerciseOrder={Number.parseInt(exerciseOrder)}
        />
      </div>
    </div>
  );
}
