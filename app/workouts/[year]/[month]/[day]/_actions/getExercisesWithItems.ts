"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/prisma";

const exerciseWithItems = Prisma.validator<Prisma.ExerciseDefaultArgs>()({
  select: {
    id: true,
    name: true,
    workoutId: true,
    order: true,
    items: {
      select: {
        type: true,
        weight: true,
        rep: true,
        time: true,
        order: true,
      },
      orderBy: {
        order: "asc",
      },
    },
  },
});

export type ExerciseWithItems = Prisma.ExerciseGetPayload<
  typeof exerciseWithItems
>;

export type ExerciseItem = ExerciseWithItems["items"][number];

export async function getExercisesWithItems(
  year: number,
  month: number,
  day: number
  // order: number
): Promise<ExerciseWithItems[]> {
  const currenUserId = 1;
  const exercises = await prisma.exercise.findMany({
    where: {
      workout: {
        year,
        month,
        day,
        authorId: currenUserId,
      },
      // order,
      authorId: currenUserId,
    },
    select: exerciseWithItems.select,
  });
  return exercises;
}
