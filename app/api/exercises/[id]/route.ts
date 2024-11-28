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
