"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";

export async function deleteItem(
  year: number,
  month: number,
  day: number,
  exerciseOrder: number,
  itemOrder: number
) {
  const currenUserId = 1;

  const targetExerciseItem = await prisma.exerciseItem.findFirstOrThrow({
    where: {
      exercise: {
        workout: {
          year: year,
          month: month,
          day: day,
          authorId: currenUserId,
        },
        order: exerciseOrder,
      },
      order: itemOrder,
    },
  });
  const targetExerciseItemId = targetExerciseItem.id;

  await prisma.exerciseItem.delete({
    where: {
      id: targetExerciseItemId,
    },
  });

  revalidatePath(`/workouts/${year}/${month}/${day}`);
  redirect(`/workouts/${year}/${month}/${day}`);
}
