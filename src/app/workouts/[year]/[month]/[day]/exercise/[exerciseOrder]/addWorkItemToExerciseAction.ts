"use server";

import { prisma } from "@/prisma";
import { ExerciseRepository } from "@/src/repositories/ExerciseRepository";
import { WorkItemRepository } from "@/src/repositories/WorkItemRepository";
import { WorkItemService } from "@/src/services/WorkItemService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addWorkItemToExerciseAction(
  year: number,
  month: number,
  day: number,
  exerciseOrder: number,
) {
  const exerciseRepository = new ExerciseRepository(prisma);
  const workItemRepository = new WorkItemRepository(prisma);
  const workItemService = new WorkItemService(
    exerciseRepository,
    workItemRepository,
  );

  workItemService.addRestItemToExercise(year, month, day, exerciseOrder);

  revalidatePath(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
  redirect(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
}
