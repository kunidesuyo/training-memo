import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ year: string, month: string, day: string, order: string }> }): Promise<Response> {
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
      sets: {
        select: {
          weight: true,
          rep: true,
          order: true
        }
      },
      rests: {
        select: {
          time: true,
          order: true
        }
      }
    }
  });
  return Response.json(exercise);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ year: string, month: string, day: string, order: string }> }): Promise<Response> {
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

  // エクササイズに紐づくセットとレストを洗い替える
  await prisma.$transaction([
    prisma.set.deleteMany({
      where: {
        exerciseId,
      },
    }),
    prisma.rest.deleteMany({
      where: {
        exerciseId,
      },
    }),
    prisma.set.createMany({
      data: data.sets.map((set: any) => {
        return {
          rep: set.rep,
          weight: set.weight,
          order: set.order,
          exerciseId,
        }
      }),
    }),
    prisma.rest.createMany({
      data: data.rests.map((rest: any) => {
        return {
          time: rest.time,
          order: rest.order,
          exerciseId,
        }
      })
    }),
  ]);
  
  const updatedExercise = await prisma.exercise.findFirst({
    where: {
      id: exerciseId,
    },
    include: {
      sets: {
        select: {
          weight: true,
          rep: true,
          order: true
        }
      },
      rests: {
        select: {
          time: true,
          order: true
        }
      }
    }
  });

  return Response.json(updatedExercise);
}
  