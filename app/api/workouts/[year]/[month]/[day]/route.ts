import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ year: string, month: string, day: string}> }): Promise<Response> {
  const year = (await params).year;
  const month = (await params).month;
  const day = (await params).day;
  const exercise = await prisma.exercise.findUnique({
    where: {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
    },
  });
  return Response.json(exercise);
}
