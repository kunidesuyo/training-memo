import { getCurrentUser } from "@/app/_utils/getCurrentUser";
import { deleteExercise } from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/_actions/deleteExercise";
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

describe("deleteExercise test", () => {
  it("対象のExerciseを削除できる", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const exerciseOrder = 1;
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
            },
          ],
        },
      },
      select: {
        exercises: true,
      },
    });

    // Act
    await deleteExercise(year, month, day, exerciseOrder);

    // Assert
    const deletedExercise = await prisma.exercise.findFirst({
      where: {
        id: targetWorkout.exercises[0].id,
      },
    });
    expect(deletedExercise).toBeNull();
  });

  it("対象のExerciseが存在しない場合、例外を返す", async () => {
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
      deleteExercise(year, month, day, exerciseOrder),
    ).rejects.toThrow("No Exercise found");
  });
});
