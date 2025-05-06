import { prisma } from "@/prisma";
import BeforeExercise from "@/src/components/pages/exercise/BeforeExercise/BeforeExercise";
import ExerciseForm from "@/src/components/pages/exercise/ExerciseForm/ExerciseForm";
import NextExercise from "@/src/components/pages/exercise/NextExercise/NextExercise";
import { ExerciseRepository } from "@/src/repositories/ExerciseRepository";
import { WorkoutRepository } from "@/src/repositories/WorkoutRepository";
import { ExerciseService } from "@/src/services/ExerciseService";
import type { Exercise } from "@/src/services/ExerciseService";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    exerciseOrder: string;
  }>;
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
      <div className="flex items-center gap-2 m-4">
        <Link
          href={`/workouts/${year}/${month}/${day}`}
          className="border border-gray-200 hover:bg-sky-100 active:bg-sky-200 duration-200 text-gray-500 hover:text-sky-600 hover:shadow-sm flex items-center gap-1 px-2 py-1 rounded-md"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-xs">戻る</span>
        </Link>
      </div>
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
      <div className="flex justify-between">
        <BeforeExercise
          props={{
            year: Number.parseInt(year),
            month: Number.parseInt(month),
            day: Number.parseInt(day),
            nowExerciseOrder: Number.parseInt(exerciseOrder),
          }}
        />
        <NextExercise
          props={{
            year: Number.parseInt(year),
            month: Number.parseInt(month),
            day: Number.parseInt(day),
            nowExerciseOrder: Number.parseInt(exerciseOrder),
          }}
        />
      </div>
    </div>
  );
}
