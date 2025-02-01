import { getCurrentUser } from "@/app/_utils/getCurrentUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Workout = {
  id: number;
  year: number;
  month: number;
  day: number;
};

export type Exercise = {
  id: number;
  name: string;
  order: number;
};

export type WorkoutWithExercises = Workout & {
  exercises?: Exercise[];
};

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
    select: {
      id: true,
      year: true,
      month: true,
      day: true,
    },
    orderBy: {
      day: "asc",
    },
  });
  return workouts;
}

export async function getWorkoutWithExercise(
  year: number,
  month: number,
  day: number
): Promise<WorkoutWithExercises|null> {
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
    include: {
      exercises: {
        include: {
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
  return workout;
}
