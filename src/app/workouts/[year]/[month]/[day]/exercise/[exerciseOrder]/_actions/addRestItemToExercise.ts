"use server";
import { prisma } from "@/prisma";
import { ExerciseRepository } from "@/src/repositories/ExerciseRepository";
import { RestItemRepository } from "@/src/repositories/RestItemRepository";
import { RestItemService } from "@/src/services/RestItemService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addRestItemToExercise(
  year: number,
  month: number,
  day: number,
  exerciseOrder: number,
) {
  const exerciseRepository = new ExerciseRepository(prisma);
  const restItemRepository = new RestItemRepository(prisma);
  const restItemService = new RestItemService(
    exerciseRepository,
    restItemRepository,
  );

  restItemService.addRestItemToExercise(year, month, day, exerciseOrder);

  revalidatePath(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
  redirect(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
}
