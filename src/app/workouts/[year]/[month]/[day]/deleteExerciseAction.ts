"use server";

import { prisma } from "@/prisma";
import { ExerciseRepository } from "@/src/repositories/ExerciseRepository";
import { WorkoutRepository } from "@/src/repositories/WorkoutRepository";
import { ExerciseService } from "@/src/services/ExerciseService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteExerciseAction(
  year: number,
  month: number,
  day: number,
  exerciseOrder: number,
) {
  const exerciseRepository = new ExerciseRepository(prisma);
  const workoutRepository = new WorkoutRepository(prisma);
  const exerciseService = new ExerciseService(
    workoutRepository,
    exerciseRepository,
  );

  await exerciseService.deleteExercise(year, month, day, exerciseOrder);

  revalidatePath(`/workouts/${year}/${month}/${day}`);
  redirect(`/workouts/${year}/${month}/${day}`);
}
