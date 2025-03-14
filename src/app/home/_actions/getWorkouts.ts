import { prisma } from "@/prisma";
import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import { Prisma } from "@prisma/client";

const workoutValidator = Prisma.validator<Prisma.WorkoutDefaultArgs>()({
  select: {
    id: true,
    year: true,
    month: true,
    day: true,
  },
});

export type Workout = Prisma.WorkoutGetPayload<typeof workoutValidator>;

export async function getWorkouts(
  year: number,
  month: number,
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
