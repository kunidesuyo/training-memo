import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ year: string, month: string, day: string, exerciseId: string }> }): Promise<Response> {
  const { year, month, day, exerciseId } = await params;
  // TODO: ログインユーザのIDで取得するようにする
  const currenUserId = 1;
  const exercise = await prisma.exercise.findFirst({
    where: {
      // TODO: orderを指定するように変更
      id: parseInt(exerciseId),
      workoutToExercise: {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
        authorId: currenUserId,
      },
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