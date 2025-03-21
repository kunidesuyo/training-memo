"use server";

import { prisma } from "@/prisma";
import { WorkoutRepository } from "@/src/repositories/WorkoutRepository";
import { WorkoutService } from "@/src/services/WorkoutService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createWorkoutAction(
  year: number,
  month: number,
  day: number,
) {
  const workoutRepository = new WorkoutRepository(prisma);
  const workoutService = new WorkoutService(workoutRepository);

  workoutService.createWorkout(year, month, day);

  revalidatePath(`/workouts/${year}/${month}/${day}`);
  redirect(`/workouts/${year}/${month}/${day}`);
}
