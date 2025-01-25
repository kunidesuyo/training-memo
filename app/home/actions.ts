import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Workout = {
  id: number;
  year: number;
  month: number;
  day: number;
};

export async function getWorkouts(year: number, month: number): Promise<Workout[]> {
  // TODO: ログインユーザのIDで取得するようにする
  const currenUserId = 1;
  const workouts = await prisma.workout.findMany({
    where: {
      year,
      month,
      authorId: currenUserId,
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
