import { Prisma } from "@prisma/client";

export const workoutValidator = Prisma.validator<Prisma.WorkoutDefaultArgs>()({
  include: {
    exercises: {
      include: {
        workItems: true,
        restItems: true,
      },
    },
  },
});

export type Workout = Prisma.WorkoutGetPayload<typeof workoutValidator>;

export type Exercise = Workout["exercises"][number];

export type WorkItem = Exercise["workItems"][number];

export type RestItem = Exercise["restItems"][number];
