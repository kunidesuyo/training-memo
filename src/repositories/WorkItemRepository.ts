import type { PrismaClient } from "@prisma/client";

export class WorkItemRepository {
  constructor(private prisma: PrismaClient) {}

  async addToExercise(
    exerciseId: number,
    workItemData: {
      weight: number;
      rep: number;
      order: number;
      authorId: number;
    },
  ) {
    await this.prisma.workExerciseItem.create({
      data: {
        exerciseId,
        weight: workItemData.weight,
        rep: workItemData.rep,
        order: workItemData.order,
        authorId: workItemData.authorId,
      },
    });
  }

  async delete(exerciseId: number, order: number) {
    await this.prisma.workExerciseItem.delete({
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
      weight: number;
      rep: number;
    },
  ) {
    await this.prisma.workExerciseItem.update({
      where: {
        exerciseId_order: {
          exerciseId,
          order,
        },
      },
      data: {
        weight: workItemData.weight,
        rep: workItemData.rep,
      },
    });
  }
}
