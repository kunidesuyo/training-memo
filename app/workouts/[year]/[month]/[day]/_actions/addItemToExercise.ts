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
  const allExerciseItems = await prisma.exerciseItem.findMany({
    where: {
      exercise: {
        workout: {
          year,
          month,
          day,
          authorId: currentUserId,
        },
        order: exerciseOrder,
      },
    },
    select: {
      exerciseId: true,
      order: true,
    },
    orderBy: {
      order: "desc",
    },
  });

  const maxOrder = allExerciseItems[0].order;
  const targetExerciseId = allExerciseItems[0].exerciseId;

  await prisma.exerciseItem.create({
    data: {
      type,
      order: maxOrder + 1,
      exerciseId: targetExerciseId,
      authorId: currentUserId,
    },
  });

  revalidatePath(`/workouts/${year}/${month}/${day}`);
  redirect(`/workouts/${year}/${month}/${day}`);
}
