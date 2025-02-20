// import { getCurrentUser } from "@/app/_utils/getCurrentUser";
// import { prisma } from "@/prisma";

import { addExercise } from "@/app/workouts/[year]/[month]/[day]/_actions/addExercise";

describe("validaition error test", () => {
  it("nameが空の場合、エラーを返す", async () => {
    const formData = new FormData();
    formData.append("name", "");
    const result = await addExercise(2025, 1, 1, { errors: {}, message: null }, formData);
    expect(result.errors?.name).toEqual(["String must contain at least 1 character(s)"]);
  });
});

describe("addExercise test", () => {
  it("WorkoutにExerciseを追加できる", async () => {
  });

  it("Workoutが存在しない場合、例外を返す", async () => {
  //   const year = 2025;
  //   const month = 1;
  //   const day = 1;
  //   const currentUser = getCurrentUser();
  //   await prisma.workout.delete({
  //     where: {
  //       year_month_day_authorId: {
  //         year,
  //         month,
  //         day,
  //         authorId: currentUser.id,
  //       },
  //     },
  //   });
  //   await expect(getWorkout(year, month, day)).rejects.toThrow(
  //     "No Workout found"
    // );
  });
});
