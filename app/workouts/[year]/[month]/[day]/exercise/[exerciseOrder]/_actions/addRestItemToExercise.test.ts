import { getCurrentUser } from "@/app/_utils/getCurrentUser";
import { addRestItemToExercise } from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/_actions/addRestItemToExercise";
import { prisma } from "@/prisma";
import { faker } from "@faker-js/faker/locale/ja";

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

describe("addRestItemToExercise test", () => {
  it("restItem, workItemを持たないExerciseにrestItemが追加できる", async () => {
    // Arrange
    const year = faker.date.anytime().getFullYear();
    const month = faker.date.future().getMonth();
    const day = faker.date.future().getDate();
    const exerciseOrder = 1;
    const currentUser = getCurrentUser();
    // const targetWorkout =
    await prisma.workout.create({
      data: {
        year,
        month,
        day,
        authorId: currentUser.id,
        exercises: {
          create: [
            {
              name: faker.lorem.words(),
              order: exerciseOrder,
              authorId: currentUser.id,
            },
          ],
        },
      },
      select: {
        exercises: true,
      },
    });

    // Act
    await addRestItemToExercise(year, month, day, exerciseOrder);

    // Assert
    const restExerciseItem = await prisma.restExerciseItem.findMany({
      where: {
        exercise: {
          workout: {
            year,
            month,
            day,
            authorId: currentUser.id,
          },
          order: exerciseOrder,
        },
      },
    });
    expect(restExerciseItem).toHaveLength(1);
    expect(restExerciseItem[0].time).toBe(0);
  });

  it("restItemを持つExerciseにrestItemが追加できる", async () => {});
  it("workItemを持つExerciseにrestItemが追加できる", async () => {});
  it("restItem, workItem両方を持つExerciseにrestItemが追加できる", async () => {});
  it("Exerciseが存在しない場合、例外を返す", async () => {});
});
