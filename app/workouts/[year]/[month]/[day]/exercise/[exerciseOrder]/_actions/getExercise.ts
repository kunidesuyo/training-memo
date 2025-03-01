import { getCurrentUser } from "@/app/_utils/getCurrentUser";
import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

const exerciseValidator = Prisma.validator<Prisma.ExerciseDefaultArgs>()({
  select: {
    id: true,
    name: true,
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

export type Exercise = Prisma.ExerciseGetPayload<typeof exerciseValidator>;

export type ExerciseItem = Exercise["items"][number];

export async function getExercise(
  year: number,
  month: number,
  day: number,
  exerciseOrder: number,
): Promise<Exercise> {
  const { id: currentUserId } = getCurrentUser();
  const exercise = await prisma.exercise.findFirstOrThrow({
    where: {
      workout: {
        year,
        month,
        day,
        authorId: currentUserId,
      },
      order: exerciseOrder,
    },
    select: exerciseValidator.select,
  });
  return exercise;
}
