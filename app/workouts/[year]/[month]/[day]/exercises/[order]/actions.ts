import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export async function getExerciseWithItems(
  year: number,
  month: number,
  day: number,
  order: number
): Promise<ExerciseWithItems> {
  const currenUserId = 1;
  const exercise = await prisma.exercise.findFirstOrThrow({
    where: {
      workout: {
        year,
        month,
        day,
        authorId: currenUserId,
      },
      order,
      authorId: currenUserId,
    },
    select: exerciseWithItems.select,
  });
  return exercise;
}
