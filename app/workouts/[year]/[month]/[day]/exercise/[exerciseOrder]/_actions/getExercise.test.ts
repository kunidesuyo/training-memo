// import { getCurrentUser } from "@/app/_utils/getCurrentUser";
// import { deleteExercise } from "@/app/workouts/[year]/[month]/[day]/_actions/deleteExercise";
// import { prisma } from "@/prisma";
// import { faker } from "@faker-js/faker/locale/ja";

beforeEach(() => {
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
});

describe("getExercise test", () => {
  it("対象のExerciseが返される", async () => {

  });

  it("対象のExerciseが存在しない場合、例外を返す", async () => {

  });

});
