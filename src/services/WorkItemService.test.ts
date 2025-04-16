import { prisma } from "@/prisma";
import { ExerciseRepository } from "@/src/repositories/ExerciseRepository";
import { WorkItemRepository } from "@/src/repositories/WorkItemRepository";
import { WorkItemService } from "@/src/services/WorkItemService";
import { getCurrentUser } from "@/src/utils/getCurrentUser";
import { faker } from "@faker-js/faker/locale/ja";

describe("addWorkItemToExercise test", () => {
  it("restItem, workItemを持たないExerciseにworkItemが追加できる", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const exerciseOrder = 1;
    const currentUser = await getCurrentUser();
    await prisma.workout.create({
      data: {
        year,
        month,
        day,
        authorId: currentUser.id,
        exercises: {
          create: [
            {
              name: faker.lorem.words(),
              order: exerciseOrder,
              authorId: currentUser.id,
            },
          ],
        },
      },
      select: {
        exercises: true,
      },
    });

    // Act
    const exerciseRepository = new ExerciseRepository(prisma);
    const workItemRepository = new WorkItemRepository(prisma);
    const workItemService = new WorkItemService(
      exerciseRepository,
      workItemRepository,
    );
    await workItemService.addWorkItemToExercise(
      year,
      month,
      day,
      exerciseOrder,
    );

    // Assert
    const workExerciseItem = await prisma.workExerciseItem.findMany({
      where: {
        exercise: {
          workout: {
            year,
            month,
            day,
            authorId: currentUser.id,
          },
          order: exerciseOrder,
        },
      },
    });
    expect(workExerciseItem).toHaveLength(1);
    expect(workExerciseItem[0].weight).toBe(0);
    expect(workExerciseItem[0].rep).toBe(0);
  });

  it("restItemを持つExerciseにworkItemが追加できる", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const exerciseOrder = 1;
    const currentUser = await getCurrentUser();
    await prisma.workout.create({
      data: {
        year,
        month,
        day,
        authorId: currentUser.id,
        exercises: {
          create: [
            {
              name: faker.lorem.words(),
              order: exerciseOrder,
              authorId: currentUser.id,
              restItems: {
                create: [
                  {
                    time: 10,
                    order: 1,
                    authorId: currentUser.id,
                  },
                ],
              },
            },
          ],
        },
      },
      select: {
        exercises: true,
      },
    });

    // Act
    const exerciseRepository = new ExerciseRepository(prisma);
    const workItemRepository = new WorkItemRepository(prisma);
    const workItemService = new WorkItemService(
      exerciseRepository,
      workItemRepository,
    );
    await workItemService.addWorkItemToExercise(
      year,
      month,
      day,
      exerciseOrder,
    );

    // Assert
    const workExerciseItem = await prisma.workExerciseItem.findMany({
      where: {
        exercise: {
          workout: {
            year,
            month,
            day,
            authorId: currentUser.id,
          },
          order: exerciseOrder,
        },
      },
    });

    expect(workExerciseItem).toHaveLength(1);
    expect(workExerciseItem[0].order).toBe(2);
  });

  it("workItemを持つExerciseにworkItemが追加できる", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const exerciseOrder = 1;
    const currentUser = await getCurrentUser();
    await prisma.workout.create({
      data: {
        year,
        month,
        day,
        authorId: currentUser.id,
        exercises: {
          create: [
            {
              name: faker.lorem.words(),
              order: exerciseOrder,
              authorId: currentUser.id,
              workItems: {
                create: [
                  {
                    weight: 10,
                    rep: 10,
                    order: 1,
                    authorId: currentUser.id,
                  },
                ],
              },
            },
          ],
        },
      },
      select: {
        exercises: true,
      },
    });

    // Act
    const exerciseRepository = new ExerciseRepository(prisma);
    const workItemRepository = new WorkItemRepository(prisma);
    const workItemService = new WorkItemService(
      exerciseRepository,
      workItemRepository,
    );
    await workItemService.addWorkItemToExercise(
      year,
      month,
      day,
      exerciseOrder,
    );

    // Assert
    const workExerciseItem = await prisma.workExerciseItem.findMany({
      where: {
        exercise: {
          workout: {
            year,
            month,
            day,
            authorId: currentUser.id,
          },
          order: exerciseOrder,
        },
      },
    });
    expect(workExerciseItem).toHaveLength(2);
    expect(workExerciseItem.some((item) => item.order === 2)).toBe(true);
  });

  it("restItem, workItem両方を持つExerciseにworkItemが追加できる", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const exerciseOrder = 1;
    const currentUser = await getCurrentUser();
    await prisma.workout.create({
      data: {
        year,
        month,
        day,
        authorId: currentUser.id,
        exercises: {
          create: [
            {
              name: faker.lorem.words(),
              order: exerciseOrder,
              authorId: currentUser.id,
              workItems: {
                create: [
                  {
                    weight: 10,
                    rep: 10,
                    order: 1,
                    authorId: currentUser.id,
                  },
                ],
              },
              restItems: {
                create: [
                  {
                    time: 10,
                    order: 2,
                    authorId: currentUser.id,
                  },
                ],
              },
            },
          ],
        },
      },
      select: {
        exercises: true,
      },
    });

    // Act
    const exerciseRepository = new ExerciseRepository(prisma);
    const workItemRepository = new WorkItemRepository(prisma);
    const workItemService = new WorkItemService(
      exerciseRepository,
      workItemRepository,
    );
    await workItemService.addWorkItemToExercise(
      year,
      month,
      day,
      exerciseOrder,
    );

    // Assert
    const workExerciseItem = await prisma.workExerciseItem.findMany({
      where: {
        exercise: {
          workout: {
            year,
            month,
            day,
            authorId: currentUser.id,
          },
          order: exerciseOrder,
        },
      },
    });
    expect(workExerciseItem).toHaveLength(2);
    expect(workExerciseItem.some((item) => item.order === 3)).toBe(true);
  });

  it("Exerciseが存在しない場合、例外を返す", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const exerciseOrder = 1;
    const currentUser = await getCurrentUser();
    await prisma.workout.create({
      data: {
        year,
        month,
        day,
        authorId: currentUser.id,
      },
    });

    // Act & Assert
    const exerciseRepository = new ExerciseRepository(prisma);
    const workItemRepository = new WorkItemRepository(prisma);
    const workItemService = new WorkItemService(
      exerciseRepository,
      workItemRepository,
    );

    await expect(
      workItemService.addWorkItemToExercise(year, month, day, exerciseOrder),
    ).rejects.toThrow("No Exercise found");
  });
});

describe.skip("deleteWorkItem test", () => {});
describe.skip("updateWorkItem test", () => {});
