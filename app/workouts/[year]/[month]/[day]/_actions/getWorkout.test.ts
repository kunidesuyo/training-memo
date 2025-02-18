import { getCurrentUser } from "@/app/_utils/getCurrentUser";
import { getWorkout } from "./getWorkout";
import { prisma } from "@/prisma";

describe("getWorkout test", () => {
  it("should return a workout", async () => {
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
    const fetchedWorkout = await getWorkout(year, month, day);
    expect(fetchedWorkout.id).toBe(workout.id);
  });
});
