import { PrismaClient } from '@prisma/client';
import { time } from 'console';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ year: string, month: string, day: string}> }): Promise<Response> {
  const year = (await params).year;
  const month = (await params).month;
  const day = (await params).day;
  console.log(month);
  // TODO: ログインユーザのIDで取得するようにする
  const currenUserId = 1;
  const workout = await prisma.workout.findUnique({
    where: {
      year_month_day_authorId: {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
        authorId: currenUserId,
      }
    },
    include: {
      exercises: {
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
      },
    },
  });
  return Response.json(workout);
}
