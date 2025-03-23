import type { PrismaClient } from "@prisma/client";

export class ExerciseRepository {
  constructor(private prisma: PrismaClient) {}

  async addToWorkout(
    workoutId: number,
    exerciseData: {
      name: string;
      order: number;
      authorId: number;
    },
  ) {
    await this.prisma.exercise.create({
      data: {
        workoutId,
        name: exerciseData.name,
        order: exerciseData.order,
        authorId: exerciseData.authorId,
      },
    });
  }

  async delete(workoutId: number, order: number) {
    await this.prisma.exercise.delete({
      where: {
        workoutId_order: {
          workoutId,
          order,
        },
      },
    });
  }
}
