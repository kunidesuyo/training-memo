import { PrismaClient } from '@prisma/client';

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
          items: {
            select: {
              type: true,
              weight: true,
              rep: true,
              time: true,
              order: true
            },
            orderBy: {
              order: 'asc',
            },
          },
        }
      },
    },
  });
  return Response.json(workout);
}
