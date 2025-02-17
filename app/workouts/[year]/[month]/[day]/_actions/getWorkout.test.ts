import { testPrisma as prisma } from "@/vitest.setup";
import { getWorkout } from "./getWorkout";
import { User } from "@prisma/client";

import * as _getCurrentUser from "@/app/_utils/getCurrentUser";
import * as _prisma from "@/prisma";

vi.spyOn(_getCurrentUser, "getCurrentUser").mockImplementation(() => {
  return { id: currentUser.id };
});

vi.spyOn(_prisma, "prisma", "get").mockImplementation(() => {
  return prisma;
});

let currentUser: User;

describe("getWorkout test", () => {
  beforeEach(async () => {
    currentUser = await prisma.user.create({
      data: {
        email: "test@example.com",
      },
    });
  });
  it("should return a workout", async () => {
    const year = 2025;
    const month = 1;
    const day = 1;
    const workout = await prisma.workout.create({
      data: {
        year,
        month,
        day,
        authorId: currentUser.id,
        exercises: {
          create: [
            {
              name: "exercise1",
              order: 1,
              authorId: currentUser.id,
              items: {
                create: [
                  {
                    type: "WORK",
                    weight: 10,
                    rep: 10,
                    order: 1,
                    authorId: currentUser.id,
                  },
                  {
                    type: "REST",
                    time: 120,
                    order: 2,
                    authorId: currentUser.id,
                  },
                ],
              },
            },
            {
              name: "exercise2",
              order: 2,
              authorId: currentUser.id,
              items: {
                create: [
                  {
                    type: "WORK",
                    weight: 10,
                    rep: 10,
                    order: 1,
                    authorId: currentUser.id,
                  },
                  {
                    type: "REST",
                    time: 120,
                    order: 2,
                    authorId: currentUser.id,
                  },
                ],
              },
            },
          ],
        },
      },
    });
    const fetchedWorkout = await getWorkout(year, month, day);
    expect(fetchedWorkout.id).toBe(workout.id);
  });
});
