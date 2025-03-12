import { getCurrentUser } from "@/app/_utils/getCurrentUser";
import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

const workoutValidator = Prisma.validator<Prisma.WorkoutDefaultArgs>()({
  select: {
    id: true,
    year: true,
    month: true,
    day: true,
    exercises: {
      select: {
        id: true,
        name: true,
      },
    },
  },
});

export type Workout = Prisma.WorkoutGetPayload<typeof workoutValidator>;

export type Exercise = Workout["exercises"][number];

export async function getWorkout(
  year: number,
  month: number,
  day: number,
): Promise<Workout | null> {
  const { id: currentUserId } = getCurrentUser();
  const workout = await prisma.workout.findUnique({
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
