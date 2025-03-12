"use server";

import { getCurrentUser } from "@/app/_utils/getCurrentUser";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createWorkout(year: number, month: number, day: number) {
  const { id: currentUserId } = getCurrentUser();
  await prisma.workout.create({
    data: {
      year: year,
      month: month,
      day: day,
      authorId: currentUserId,
    },
  });

  revalidatePath(`/workouts/${year}/${month}/${day}`);
  redirect(`/workouts/${year}/${month}/${day}`);
}
