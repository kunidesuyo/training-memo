import { getCurrentUser } from "@/app/_utils/getCurrentUser";
import { addExercise } from "@/app/workouts/[year]/[month]/[day]/_actions/addExercise";
import { prisma } from "@/prisma";
import { faker } from "@faker-js/faker/locale/ja";

describe("validaition error test", () => {
  it("nameが空の場合、エラーを返す", async () => {
    const formData = new FormData();
    formData.append("name", "");
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const result = await addExercise(
      year,
      month,
      day,
      { errors: {}, message: null },
      formData
    );
    expect(result.errors?.name).toEqual([
      "String must contain at least 1 character(s)",
    ]);
  });
});

describe("addExercise test", () => {
  it("WorkoutにExerciseを追加できる", async () => {
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const currentUser = getCurrentUser();
    const workout = await prisma.workout.create({
      data: {
        year,
        month,
        day,
        authorId: currentUser.id,
      },
    });
    const formData = new FormData();
    formData.append("name", "test");
    await addExercise(
      year,
      month,
      day,
      { errors: {}, message: null },
      formData
    );

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

    const exercises = await prisma.exercise.findMany({
      where: {
        workoutId: workout.id,
      },
    });
    expect(exercises).toHaveLength(1);
    expect(exercises[0].name).toBe("test");
  });

  it("Workoutが存在しない場合、例外を返す", async () => {
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const currentUser = getCurrentUser();
    await prisma.workout.create({
      data: {
        year,
        month,
        day,
        authorId: currentUser.id,
      },
    });

    const formData = new FormData();
    formData.append("name", "test");

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

    await expect(
      addExercise(year + 1, month, day, { errors: {}, message: null }, formData)
    ).rejects.toThrow("No Workout found");
  });
});
