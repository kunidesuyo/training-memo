"use server";

import { prisma } from "@/prisma";
import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteWorkItem(
  year: number,
  month: number,
  day: number,
  exerciseOrder: number,
  itemOrder: number,
) {
  const { id: currentUserId } = getCurrentUser();
  const targetExerciseItem = await prisma.workExerciseItem.findFirstOrThrow({
    where: {
      exercise: {
        workout: {
          year: year,
          month: month,
          day: day,
          authorId: currentUserId,
        },
        order: exerciseOrder,
      },
      order: itemOrder,
    },
  });
  const targetExerciseItemId = targetExerciseItem.id;

  await prisma.workExerciseItem.delete({
    where: {
      id: targetExerciseItemId,
    },
  });

  revalidatePath(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
  redirect(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
}
