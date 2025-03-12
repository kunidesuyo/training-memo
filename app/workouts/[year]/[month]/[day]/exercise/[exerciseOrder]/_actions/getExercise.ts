import { getCurrentUser } from "@/app/_utils/getCurrentUser";
import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

const exerciseValidator = Prisma.validator<Prisma.ExerciseDefaultArgs>()({
  select: {
    id: true,
    name: true,
    order: true,
    workItems: {
      select: {
        order: true,
        weight: true,
        rep: true,
      },
      orderBy: {
        order: "asc",
      },
    },
    restItems: {
      select: {
        order: true,
        time: true,
      },
      orderBy: {
        order: "asc",
      },
    },
  },
});

export type Exercise = Prisma.ExerciseGetPayload<typeof exerciseValidator>;

export type WorkItem = Exercise["workItems"][number];

export type RestItem = Exercise["restItems"][number];

// export type ExerciseItem = Exercise["items"][number];

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
