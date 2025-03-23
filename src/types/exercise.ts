import { Prisma } from "@prisma/client";

export const exerciseValidator = Prisma.validator<Prisma.ExerciseDefaultArgs>()(
  {
    include: {
      workItems: true,
      restItems: true,
    },
  },
);

export type Exercise = Prisma.ExerciseGetPayload<typeof exerciseValidator>;

export type WorkItem = Exercise["workItems"][number];

export type RestItem = Exercise["restItems"][number];
