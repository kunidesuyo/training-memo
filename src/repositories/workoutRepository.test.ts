import { prisma } from "@/prisma";
import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import { WorkoutRepository } from "@/src/repositories/WorkoutRepository";

describe("findByDate test", () => {
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
    const fetchedWorkout = await workoutRepository.findByDate(
      year,
      month,
      day,
      currentUser.id,
    );

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
    await expect(
      workoutRepository.findByDate(year, month, day, 1),
    ).rejects.toThrow();
  });
});

describe("findManyByYearAndMonth test", () => {
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
    const fetchedWorkouts = await workoutRepository.findManyByYearAndMonth(
      year,
      month,
      currentUser.id,
    );

    // Assert
    expect(fetchedWorkouts).toHaveLength(workouts.length);
    const sortedFetchedWorkouts = fetchedWorkouts.sort((a, b) => a.id - b.id);
    const sortedWorkouts = workouts.sort((a, b) => a.id - b.id);
    for (let i = 0; i < sortedWorkouts.length; i++) {
      expect(sortedFetchedWorkouts[i].id).toBe(sortedWorkouts[i].id);
    }
  });
  it("Workoutが存在しない場合、空配列を返す", async () => {
    // Arrange
    const year = 2025;
    const month = 1;
    const currentUser = getCurrentUser();

    // Act & Assert
    const workoutRepository = new WorkoutRepository(prisma);
    const fetchedWorkouts = await workoutRepository.findManyByYearAndMonth(
      year,
      month,
      currentUser.id,
    );
    expect(fetchedWorkouts).toHaveLength(0);
  });
});

describe("create test", () => {
  it("workoutを作成できる", async () => {
    // Arrange
    const year = 2025;
    const month = 1;
    const day = 1;
    const currentUser = getCurrentUser();

    // Act
    const workoutRepository = new WorkoutRepository(prisma);
    await workoutRepository.create(year, month, day, currentUser.id);

    // Assert
    const workout = await prisma.workout.findUnique({
      where: {
        year_month_day_authorId: { year, month, day, authorId: currentUser.id },
      },
    });
    expect(workout).not.toBeNull();
  });
});
