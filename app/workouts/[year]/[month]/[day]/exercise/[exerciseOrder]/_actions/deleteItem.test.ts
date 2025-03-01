import { deleteItem } from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/_actions/deleteItem";
import { getCurrentUser } from "@/app/_utils/getCurrentUser";
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

describe("deleteItem test", () => {
  it("対象のItemが削除できる", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const exerciseOrder = 1;
    const itemOrder = 1;
    const currentUser = getCurrentUser();
    const targetWorkout = await prisma.workout.create({
      data: {
        year,
        month,
        day,
        authorId: currentUser.id,
        exercises: {
          create: [
            {
              name: "test",
              order: exerciseOrder,
              authorId: currentUser.id,
              items: {
                create: [
                  {
                    type: "WORK",
                    weight: 10,
                    rep: 10,
                    order: itemOrder,
                    authorId: currentUser.id,
                  },
                ],
              },
            },
          ],
        },
      },
      select: {
        exercises: {
          select: {
            items: true,
          },
        },
      },
    });

    // Act
    await deleteItem(year, month, day, exerciseOrder, itemOrder);

    // Assert
    const deletedItem = await prisma.exerciseItem.findFirst({
      where: {
        id: targetWorkout.exercises[0].items[0].id,
      },
    });
    expect(deletedItem).toBeNull();
  });

  it("対象のWorkoutが存在しない場合、例外を返す", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const exerciseOrder = 1;
    const itemOrder = 1;

    // Act & Assert
    await expect(
      deleteItem(year, month, day, exerciseOrder, itemOrder)
    ).rejects.toThrow("No ExerciseItem found");
  });

  it("対象のExerciseが存在しない場合、例外を返す", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const exerciseOrder = 1;
    const itemOrder = 1;
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
      deleteItem(year, month, day, exerciseOrder, itemOrder)
    ).rejects.toThrow("No ExerciseItem found");
  });

  it("対象のItemが存在しない場合、例外を返す", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const exerciseOrder = 1;
    const itemOrder = 1;
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
              name: "test",
              order: exerciseOrder,
              authorId: currentUser.id,
            },
          ],
        },
      },
    });

    // Act & Assert
    await expect(
      deleteItem(year, month, day, exerciseOrder, itemOrder)
    ).rejects.toThrow("No ExerciseItem found");
  });
});
