import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(): Promise<Response> {
  const workouts = await prisma.workout.findMany({
    include: {
      exercises: {
        select: {
          name: true
        },
      },
    },
  });
  return Response.json(workouts);
}
