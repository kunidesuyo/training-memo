import { prisma } from "@/prisma";
import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import { WorkoutRepository } from "@/src/repositories/WorkoutRepository";
import { ExerciseService } from "@/src/services/ExerciseService";
import { faker } from "@faker-js/faker/locale/ja";
import { ExerciseRepository } from "./../repositories/ExerciseRepository";

describe("addExerciseToWorkout test", () => {
  it("WorkoutにExerciseを追加できる", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const currentUser = await getCurrentUser();
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
    const workoutRepository = new WorkoutRepository(prisma);
    const exerciseService = new ExerciseService(
      workoutRepository,
      exerciseRepository,
    );
    const exerciseName = "test";
    await exerciseService.addExerciseToWorkout(year, month, day, exerciseName);

    // Assert
    const exercises = await prisma.exercise.findMany({
      where: {
        workoutId: workout.id,
      },
    });
    expect(exercises).toHaveLength(1);
    expect(exercises[0].name).toBe(exerciseName);
  });

  it("Workoutが存在しない場合、例外を返す", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
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
    const workoutRepository = new WorkoutRepository(prisma);
    const exerciseService = new ExerciseService(
      workoutRepository,
      exerciseRepository,
    );

    await expect(
      exerciseService.addExerciseToWorkout(year + 1, month, day, "test"),
    ).rejects.toThrow("No Workout found");
  });
});
