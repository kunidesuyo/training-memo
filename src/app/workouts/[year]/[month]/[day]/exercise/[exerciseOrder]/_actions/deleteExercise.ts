"use server";

import { prisma } from "@/prisma";
import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteExercise(
  year: number,
  month: number,
  day: number,
  exerciseOrder: number,
) {
  const targetWorkout = await prisma.workout.findUniqueOrThrow({
    where: {
      year_month_day_authorId: {
        year,
        month,
        day,
        authorId: getCurrentUser().id,
      },
    },
  });

  await prisma.exercise.delete({
    where: {
      workoutId_order: {
        workoutId: targetWorkout.id,
        order: exerciseOrder,
      },
    },
  });

  revalidatePath(`/workouts/${year}/${month}/${day}`);
  redirect(`/workouts/${year}/${month}/${day}`);
}
