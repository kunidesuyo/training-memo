import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(): Promise<Response> {
  const exercises = await prisma.exercise.findMany();
  return Response.json(exercises);
}

export async function POST(request: Request): Promise<Response> {
  const { name, weight, rep, date } = await request.json();
  const user = await prisma.user.findFirst();
  const exercise = await prisma.exercise.create({
    data: {
      name,
      weight,
      rep,
      date,
      // TODO: ログインユーザで更新する
      // 一旦、存在する最初のユーザを取得して更新者と作成者に設定
      creator: {
        connect: { id: user?.id },
      },
      updater: {
        connect: { id: user?.id },
      }
    },
  });
  return Response.json({id: exercise.id});
}
