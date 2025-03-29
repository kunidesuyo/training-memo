import type { PrismaClient } from "@prisma/client";

export class RestItemRepository {
  constructor(private prisma: PrismaClient) {}

  async addToExercise(
    exerciseId: number,
    restItemData: {
      time: number;
      order: number;
      authorId: number;
    },
  ) {
    await this.prisma.restExerciseItem.create({
      data: {
        exerciseId,
        time: restItemData.time,
        order: restItemData.order,
        authorId: restItemData.authorId,
      },
    });
  }
  async delete(exerciseId: number, order: number) {
    await this.prisma.restExerciseItem.delete({
      where: {
        exerciseId_order: {
          exerciseId,
          order,
        },
      },
    });
  }

  async update(
    exerciseId: number,
    order: number,
    workItemData: {
      time: number;
    },
  ) {
    await this.prisma.restExerciseItem.update({
      where: {
        exerciseId_order: {
          exerciseId,
          order,
        },
      },
      data: {
        time: workItemData.time,
      },
    });
  }
}
