import { getCurrentUser } from "@/app/_utils/getCurrentUser";
import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

const workoutValidator = Prisma.validator<Prisma.WorkoutDefaultArgs>()({
  select: {
    id: true,
    exercises: {
      select: {
        id: true,
        name: true,
        workoutId: true,
        order: true,
        workItems: {
          select: {
            exerciseId: true,
            weight: true,
            rep: true,
            order: true,
          },
          orderBy: {
            order: "asc",
          },
        },
        restItems: {
          select: {
            exerciseId: true,
            time: true,
            order: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    },
  },
});

export type Workout = Prisma.WorkoutGetPayload<typeof workoutValidator>;

export type Exercise = Workout["exercises"][number];

export type WorkItem = Exercise["workItems"][number];

export type RestItem = Exercise["restItems"][number];

// export type ExerciseItem = ExerciseWithItems["items"][number];

export async function getWorkout(
  year: number,
  month: number,
  day: number
): Promise<Workout> {
  const { id: currentUserId } = getCurrentUser();
  const workout = await prisma.workout.findUniqueOrThrow({
    where: {
      year_month_day_authorId: {
        year,
        month,
        day,
        authorId: currentUserId,
      },
    },
    select: workoutValidator.select,
  });
  return workout;
}
