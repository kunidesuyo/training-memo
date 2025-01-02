import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type ExerciseItem = {
  type: "WORK" | "REST";
  weight: number | null;
  rep: number | null;
  time: number | null;
  order: number;
};

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      year: string;
      month: string;
      day: string;
      order: string;
    }>;
  }
): Promise<Response> {
  const { year, month, day, order } = await params;
  // TODO: ログインユーザのIDで取得するようにする
  const currenUserId = 1;
  const exercise = await prisma.exercise.findFirst({
    where: {
      workout: {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
        authorId: currenUserId,
      },
      order: parseInt(order),
      authorId: currenUserId,
    },
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
  });
  return Response.json(exercise);
}

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      year: string;
      month: string;
      day: string;
      order: string;
    }>;
  }
): Promise<Response> {
  const { year, month, day, order } = await params;
  // TODO: ログインユーザのIDで取得するようにする
  const currenUserId = 1;
  const data = await request.json();

  // 対象エクササイズのIDを取得
  const exercise = await prisma.exercise.findFirst({
    where: {
      workout: {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
        authorId: currenUserId,
      },
      order: parseInt(order),
    },
  });
  const exerciseId = exercise?.id;

  // エクササイズに紐づく要素を洗い替える
  await prisma.$transaction([
    prisma.exerciseItem.deleteMany({
      where: {
        exerciseId,
      },
    }),
    prisma.exerciseItem.createMany({
      data: data.items.map((item: ExerciseItem) => {
        return {
          type: item.type,
          rep: item.rep,
          weight: item.weight,
          time: item.time,
          order: item.order,
          exerciseId,
          authorId: currenUserId,
        };
      }),
    }),
  ]);

  const updatedExercise = await prisma.exercise.findFirst({
    where: {
      id: exerciseId,
    },
    include: {
      items: {
        select: {
          type: true,
          weight: true,
          rep: true,
          time: true,
          order: true,
        },
      },
    },
  });

  return Response.json(updatedExercise);
}
