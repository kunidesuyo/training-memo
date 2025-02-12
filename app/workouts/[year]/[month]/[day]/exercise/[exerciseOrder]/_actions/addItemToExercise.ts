"use server";

import { ExerciseItemType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";
import { getCurrentUser } from "@/app/_utils/getCurrentUser";

export async function addItemToExercise(
  type: ExerciseItemType,
  year: number,
  month: number,
  day: number,
  exerciseOrder: number
) {
  const { id: currentUserId } = getCurrentUser();
  const targetExercise = await prisma.exercise.findFirstOrThrow({
    where: {
      workout: {
        year,
        month,
        day,
        authorId: currentUserId,
      },
      order: exerciseOrder,
    },
    select: {
      id: true,
      items: true,
    },
  });

  const newItemOrder = targetExercise.items.length + 1;

  await prisma.exerciseItem.create({
    data: {
      type,
      order: newItemOrder,
      exerciseId: targetExercise.id,
      authorId: currentUserId,
    },
  });

  revalidatePath(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
  redirect(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
}
