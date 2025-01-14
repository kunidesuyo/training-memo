import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ year: string; month: string }> }
): Promise<Response> {
  const year = (await params).year;
  const month = (await params).month;
  // TODO: ログインユーザのIDで取得するようにする
  const currenUserId = 1;
  const workouts = await prisma.workout.findMany({
    where: {
      year: parseInt(year),
      month: parseInt(month),
      authorId: currenUserId,
    },
    select: {
      id: true,
      day: true,
    },
    orderBy: {
      day: "asc",
    }
  });
  return Response.json(workouts);
}
