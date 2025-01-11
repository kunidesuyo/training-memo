import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: Promise<{ year: string; month: string; day: string }> }
): Promise<Response> {
  const year = (await params).year;
  const month = (await params).month;
  const day = (await params).day;
  const name: string = (await request.json()).name;
  // TODO: ログインユーザのIDで取得するようにする
  const currenUserId = 1;
  // console.log(`year: ${year}, month: ${month}, day: ${day}, name: ${name}`);

  // TODO: 以下のもっと綺麗に書けそう
  const workout = await prisma.workout.findFirstOrThrow({
    where: {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      authorId: currenUserId,
    },
    select: {
      id: true,
      exercises: {
        select: {
          order: true,
        },
      },
    },
  });
  const workoutId = workout?.id;
  const maxOrder = workout?.exercises.reduce(
    (acc, cur) => Math.max(acc, cur.order),
    0
  );
  const newOrder = maxOrder + 1;
  const exercise = await prisma.exercise.create({
    data: {
      name: name,
      workoutId,
      order: newOrder,
      authorId: currenUserId,
    },
  });
  return new Response(JSON.stringify(exercise), { status: 200 });
}
