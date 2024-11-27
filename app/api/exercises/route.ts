import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(): Promise<Response> {
  const exercises = await prisma.exercise.findMany();
  return Response.json(exercises);
}
