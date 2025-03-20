import { prisma } from "@/prisma";
import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import { WorkoutRepository } from "@/src/repositories/workoutRepository";

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
  it("workoutを取得できる", async () => {});
  it("Workoutが存在しない場合、空配列を返す", async () => {});
});

describe("create test", () => {
  it("workoutを作成できる", async () => {});
});
