import { prisma } from "@/prisma";

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

export async function getWorkoutWithExercise(
  year: number,
  month: number,
  day: number
): Promise<WorkoutWithExercises> {
  // TODO: ログインユーザのIDで取得するようにする
  const currenUserId = 1;
  const workout = await prisma.workout.findUniqueOrThrow({
    where: {
      year_month_day_authorId: {
        year,
        month,
        day,
        authorId: currenUserId,
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
