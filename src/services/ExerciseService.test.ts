import { prisma } from "@/prisma";
import { WorkoutRepository } from "@/src/repositories/WorkoutRepository";
import { ExerciseService } from "@/src/services/ExerciseService";
import { getCurrentUser } from "@/src/utils/getCurrentUser";
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

describe("getExercise test", () => {
  it("Exerciseが存在する場合、Exerciseを返す", async () => {
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
    const workoutRepository = new WorkoutRepository(prisma);
    const exerciseService = new ExerciseService(
      workoutRepository,
      exerciseRepository,
    );
    const fetchedExercise = await exerciseService.getExercise(
      year,
      month,
      day,
      exercise.order,
    );

    // Assert
    expect(fetchedExercise.id).toBe(exercise.id);
  });

  it("Exerciseが存在しない場合、例外を返す", async () => {
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
      exerciseService.getExercise(year, month, day, 1),
    ).rejects.toThrow();
  });
});

describe("getExerciseOrNull test", () => {
  it("Exerciseが存在する場合、Exerciseを返す", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const currentUser = await getCurrentUser();
    const exerciseOrder = 1;
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
        order: exerciseOrder,
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
    const fetchedExercise = await exerciseService.getExerciseOrNull(
      year,
      month,
      day,
      exerciseOrder,
    );

    // Assert
    expect(fetchedExercise?.id).toBe(exercise.id);
  });

  it("Exerciseが存在しない場合、nullを返す", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const currentUser = await getCurrentUser();
    const exerciseOrder = 1;
    await prisma.workout.create({
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
    const fetchedExercise = await exerciseService.getExerciseOrNull(
      year,
      month,
      day,
      exerciseOrder,
    );

    // Assert
    expect(fetchedExercise).toBeNull();
  });
});

describe("deleteExercise test", () => {
  it("Exerciseが存在する場合、Exerciseを削除できる", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const currentUser = await getCurrentUser();
    const exerciseOrder = 1;
    const workout = await prisma.workout.create({
      data: {
        year,
        month,
        day,
        authorId: currentUser.id,
      },
    });
    await prisma.exercise.create({
      data: {
        workoutId: workout.id,
        name: "test",
        order: exerciseOrder,
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
    await exerciseService.deleteExercise(year, month, day, exerciseOrder);

    // Assert
    const exercises = await prisma.exercise.findMany({
      where: {
        workoutId: workout.id,
      },
    });
    expect(exercises).toHaveLength(0);
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
    const workoutRepository = new WorkoutRepository(prisma);
    const exerciseService = new ExerciseService(
      workoutRepository,
      exerciseRepository,
    );

    await expect(
      exerciseService.deleteExercise(year, month, day, exerciseOrder),
    ).rejects.toThrow();
  });
});
