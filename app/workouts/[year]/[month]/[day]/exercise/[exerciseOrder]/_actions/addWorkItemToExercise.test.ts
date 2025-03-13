import { getCurrentUser } from "@/app/_utils/getCurrentUser";
import { addWorkItemToExercise } from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/_actions/addWorkItemToExercise";
import { prisma } from "@/prisma";
import { faker } from "@faker-js/faker/locale/ja";

beforeEach(() => {
  vi.mock("next/cache", () => {
    return {
      revalidatePath: () => {
        return;
      },
    };
  });

  vi.mock("next/navigation", () => {
    return {
      redirect: () => {
        return;
      },
    };
  });
});

describe("addRestItemToExercise test", () => {
  it("restItem, workItemを持たないExerciseにrestItemが追加できる", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const exerciseOrder = 1;
    const currentUser = getCurrentUser();
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
    await addWorkItemToExercise(year, month, day, exerciseOrder);

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
  });

  it("restItemを持つExerciseにrestItemが追加できる", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const exerciseOrder = 1;
    const currentUser = getCurrentUser();
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
    await addWorkItemToExercise(year, month, day, exerciseOrder);

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
  it("workItemを持つExerciseにrestItemが追加できる", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const exerciseOrder = 1;
    const currentUser = getCurrentUser();
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
    await addWorkItemToExercise(year, month, day, exerciseOrder);

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
  it("restItem, workItem両方を持つExerciseにrestItemが追加できる", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const exerciseOrder = 1;
    const currentUser = getCurrentUser();
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
    await addWorkItemToExercise(year, month, day, exerciseOrder);

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
    const currentUser = getCurrentUser();
    await prisma.workout.create({
      data: {
        year,
        month,
        day,
        authorId: currentUser.id,
      },
    });

    // Act & Assert
    await expect(
      addWorkItemToExercise(year, month, day, exerciseOrder),
    ).rejects.toThrow("No Exercise found");
  });
});
