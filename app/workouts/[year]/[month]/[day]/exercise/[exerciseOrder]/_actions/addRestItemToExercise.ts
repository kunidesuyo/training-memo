"use server";

import { getCurrentUser } from "@/app/_utils/getCurrentUser";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addRestItemToExercise(
  year: number,
  month: number,
  day: number,
  exerciseOrder: number,
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
      workItems: true,
      restItems: true,
    },
  });

  const targetExerciseItems = [
    ...targetExercise.workItems,
    ...targetExercise.restItems,
  ];

  const newItemOrder =
    targetExerciseItems.length === 0
      ? 1
      : Math.max(...targetExerciseItems.map((item) => item.order)) + 1;

  await prisma.restExerciseItem.create({
    data: {
      time: 0,
      order: newItemOrder,
      exerciseId: targetExercise.id,
      authorId: currentUserId,
    },
  });

  revalidatePath(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
  redirect(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
}
