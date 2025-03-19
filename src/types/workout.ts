import { Prisma } from "@prisma/client";

export const workoutValidator = Prisma.validator<Prisma.WorkoutDefaultArgs>()({
  select: {
    id: true,
    exercises: {
      select: {
        id: true,
        name: true,
        workoutId: true,
        order: true,
        workItems: {
          select: {
            exerciseId: true,
            weight: true,
            rep: true,
            order: true,
          },
          orderBy: {
            order: "asc",
          },
        },
        restItems: {
          select: {
            exerciseId: true,
            time: true,
            order: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    },
  },
});

export type Workout = Prisma.WorkoutGetPayload<typeof workoutValidator>;

export type Exercise = Workout["exercises"][number];

export type WorkItem = Exercise["workItems"][number];

export type RestItem = Exercise["restItems"][number];
