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
        workoutId: true,
        order: true,
        workItems: {
          select: {
            weight: true,
            rep: true,
            order: true,
          },
        },
        restItems: {
          select: {
            time: true,
            order: true,
          },
        },
      },
    },
  },
});

export type Workout = Prisma.WorkoutGetPayload<typeof workoutValidator>;

export async function getWorkouts(
  year: number,
  month: number
): Promise<Workout[]> {
  const { id: currentUserId } = getCurrentUser();
  const workouts = await prisma.workout.findMany({
    where: {
      year,
      month,
      authorId: currentUserId,
    },
    select: workoutValidator.select,
  });
  return workouts;
}
