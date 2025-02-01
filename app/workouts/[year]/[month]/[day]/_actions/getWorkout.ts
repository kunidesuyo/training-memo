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
    },
  },
});

export type Workout = Prisma.WorkoutGetPayload<typeof workoutValidator>;

export type ExerciseWithItems = Workout["exercises"][number];

export type ExerciseItem = ExerciseWithItems["items"][number];

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
  console.log(workout);
  return workout;
}
