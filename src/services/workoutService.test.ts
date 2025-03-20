import { prisma } from "@/prisma";
import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import { WorkoutRepository } from "@/src/repositories/workoutRepository";
import { WorkoutService } from "@/src/services/workoutService";

describe("getWorkout test", () => {
  it("workoutを取得できる", async () => {
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
    const workoutRepository = new WorkoutRepository(prisma);
    const workoutService = new WorkoutService(workoutRepository);
    const fetchedWorkout = await workoutService.getWorkout(year, month, day);

    // Assert
    expect(fetchedWorkout.id).toBe(workout.id);
  });

  it("Workoutが存在しない場合、例外を返す", async () => {
    // Arrange
    const year = 2025;
    const month = 1;
    const day = 1;

    // Act & Assert
    const workoutRepository = new WorkoutRepository(prisma);
    const workoutService = new WorkoutService(workoutRepository);
    await expect(workoutService.getWorkout(year, month, day)).rejects.toThrow();
  });
});

describe("getWorkoutsInMonth test", () => {
  it("workoutを取得できる", async () => {
    // Arrange
    const year = 2025;
    const month = 1;
    const days = [1, 2, 3];
    const currentUser = getCurrentUser();
    const workouts = [];
    for (const day of days) {
      const workout = await prisma.workout.create({
        data: {
          year,
          month,
          day,
          authorId: currentUser.id,
        },
      });
      workouts.push(workout);
    }

    // Act
    const workoutRepository = new WorkoutRepository(prisma);
    const workoutService = new WorkoutService(workoutRepository);
    const fetchedWorkouts = await workoutService.getWorkoutsInMonth(
      year,
      month,
    );

    // Assert
    expect(fetchedWorkouts).toHaveLength(workouts.length);
    const sortedFetchedWorkouts = fetchedWorkouts.sort((a, b) => a.id - b.id);
    const sortedWorkouts = workouts.sort((a, b) => a.id - b.id);
    for (let i = 0; i < sortedWorkouts.length; i++) {
      expect(sortedFetchedWorkouts[i].id).toBe(sortedWorkouts[i].id);
    }
  });

  it("Workoutが存在しない場合、空の配列を返す", async () => {
    // Arrange
    const year = 2025;
    const month = 1;

    // Act & Assert
    const workoutRepository = new WorkoutRepository(prisma);
    const workoutService = new WorkoutService(workoutRepository);
    const fetchedWorkouts = await workoutService.getWorkoutsInMonth(
      year,
      month,
    );
    expect(fetchedWorkouts).toHaveLength(0);
  });
});

describe("createWorkout test", () => {
  it("workoutを作成できる", async () => {
    // Arrange
    const year = 2025;
    const month = 1;
    const day = 1;
    const currentUser = getCurrentUser();

    // Act
    const workoutRepository = new WorkoutRepository(prisma);
    const workoutService = new WorkoutService(workoutRepository);
    await workoutService.createWorkout(year, month, day);

    // Assert
    const workout = await prisma.workout.findUnique({
      where: {
        year_month_day_authorId: { year, month, day, authorId: currentUser.id },
      },
    });
    expect(workout).not.toBeNull();
  });
});
