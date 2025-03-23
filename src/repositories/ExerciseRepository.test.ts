import { prisma } from "@/prisma";
import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import { ExerciseRepository } from "@/src/repositories/ExerciseRepository";

describe.skip("addToWorkout test", () => {});

describe("delte test", () => {
  it("exerciseが削除されること", async () => {
    // Arrange
    const year = 2025;
    const month = 1;
    const day = 1;
    const currentUser = getCurrentUser();
    const workout = await prisma.workout.create({
      data: {
        year,
        month,
        day,
        authorId: currentUser.id,
      },
    });
    const exercise = await prisma.exercise.create({
      data: {
        workoutId: workout.id,
        name: "test",
        order: 1,
        authorId: currentUser.id,
      },
    });

    // Act
    const exerciseRepository = new ExerciseRepository(prisma);
    await exerciseRepository.delete(workout.id, exercise.order);

    // Assert
    const fetchedExercise = await prisma.exercise.findUnique({
      where: {
        workoutId_order: {
          workoutId: workout.id,
          order: exercise.order,
        },
      },
    });
    expect(fetchedExercise).toBeNull();
  });

  it("対象のworkoutが存在しない場合、例外を返す", async () => {
    // Arrange

    // Act
    const exerciseRepository = new ExerciseRepository(prisma);

    // Assert
    await expect(exerciseRepository.delete(1, 1)).rejects.toThrow();
  });

  it("対象のexerciseが存在しない場合、例外を返す", async () => {
    // Arrange
    const year = 2025;
    const month = 1;
    const day = 1;
    const currentUser = getCurrentUser();
    const workout = await prisma.workout.create({
      data: {
        year,
        month,
        day,
        authorId: currentUser.id,
      },
    });

    // Act
    const exerciseRepository = new ExerciseRepository(prisma);

    // Assert
    await expect(exerciseRepository.delete(workout.id, 1)).rejects.toThrow();
  });
});
