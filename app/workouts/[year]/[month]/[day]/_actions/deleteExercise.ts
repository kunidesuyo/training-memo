"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

export async function deleteExercise(
  year: number,
  month: number,
  day: number,
  order: number
) {
  // TODO: Exerciseスキーマにユニーク制約を追加して直接削除できるように修正する

  const targetExercise = await prisma.exercise.findFirstOrThrow({
    where: {
      workout: {
        year,
        month,
        day,
      },
      order,
    },
  });

  await prisma.exercise.delete({
    where: {
      id: targetExercise.id,
    },
  });

  revalidatePath(`/workouts/${year}/${month}/${day}`);
  redirect(`/workouts/${year}/${month}/${day}`);
}
