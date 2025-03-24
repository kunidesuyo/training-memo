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
}
