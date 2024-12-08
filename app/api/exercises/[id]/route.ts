import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  const id = (await params).id;
  const exercise = await prisma.exercise.findUnique({
    where: {
      id: Number(id),
    },
  });
  return Response.json(exercise);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  const id = (await params).id;
  const exercise = await prisma.exercise.delete({
    where: {
      id: Number(id),
    },
  });
  return Response.json(exercise);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  const id = (await params).id;
  const { name, weight, rep, date } = await request.json();
  const user = await prisma.user.findFirst();
  const exercise = await prisma.exercise.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      weight,
      rep,
      date,
      // TODO: ログインユーザで更新する
      // 一旦、存在する最初のユーザを取得して更新者と作成者に設定
      updater: {
        connect: { id: user?.id },
      }
    },
  });
  return Response.json(exercise);
}
