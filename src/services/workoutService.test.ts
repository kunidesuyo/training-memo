import { prisma } from "@/prisma";
import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import { WorkoutRepository } from "@/src/repositories/workoutRepository";
import { WorkoutService } from "@/src/services/workoutService";

describe("workoutService.getWorkout test", () => {
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
