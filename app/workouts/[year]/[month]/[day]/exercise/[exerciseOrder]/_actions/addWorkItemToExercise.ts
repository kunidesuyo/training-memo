"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";
import { getCurrentUser } from "@/app/_utils/getCurrentUser";

export async function addWorkItemToExercise(
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
      workItems: true,
      restItems: true,
    },
  });

  const targetExerciseItems = [
    ...targetExercise.workItems,
    ...targetExercise.restItems,
  ];

  const newItemOrder =
    Math.max(...targetExerciseItems.map((item) => item.order)) + 1;

  await prisma.workExerciseItem.create({
    data: {
      weight: 0,
      rep: 0,
      order: newItemOrder,
      exerciseId: targetExercise.id,
      authorId: currentUserId,
    },
  });

  revalidatePath(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
  redirect(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
}
