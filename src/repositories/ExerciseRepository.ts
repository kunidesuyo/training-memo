import { exerciseValidator } from "@/src/types/exercise";
import type { Exercise } from "@/src/types/exercise";
import type { PrismaClient } from "@prisma/client";

export class ExerciseRepository {
  constructor(private prisma: PrismaClient) {}

  async findByDateAndOrder(
    year: number,
    month: number,
    day: number,
    order: number,
    authorId: number,
  ): Promise<Exercise> {
    const exercise = await this.prisma.exercise.findFirstOrThrow({
      where: {
        workout: {
          year,
          month,
          day,
          authorId,
        },
        order,
      },
      include: exerciseValidator.include,
    });
    return exercise;
  }

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
