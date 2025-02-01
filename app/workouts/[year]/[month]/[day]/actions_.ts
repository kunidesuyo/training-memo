"use server";

import { ExerciseItemType, Prisma, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const prisma = new PrismaClient();

const exerciseWithItems = Prisma.validator<Prisma.ExerciseDefaultArgs>()({
  select: {
    id: true,
    name: true,
    workoutId: true,
    order: true,
    items: {
      select: {
        type: true,
        weight: true,
        rep: true,
        time: true,
        order: true,
      },
      orderBy: {
        order: "asc",
      },
    },
  },
});

export type ExerciseWithItems = Prisma.ExerciseGetPayload<
  typeof exerciseWithItems
>;

export type ExerciseItem = ExerciseWithItems["items"][number];

export async function getExercisesWithItems(
  year: number,
  month: number,
  day: number
  // order: number
): Promise<ExerciseWithItems[]> {
  const currenUserId = 1;
  const exercises = await prisma.exercise.findMany({
    where: {
      workout: {
        year,
        month,
        day,
        authorId: currenUserId,
      },
      // order,
      authorId: currenUserId,
    },
    select: exerciseWithItems.select,
  });
  return exercises;
}

const WorkItemFormSchema = z.object({
  weight: z.coerce.number(),
  rep: z.coerce.number(),
});

export type State = {
  errors?: {
    weight?: string[];
    rep?: string[];
  };
  message?: string | null;
};

export async function updateExerciseItems(
  year: number,
  month: number,
  day: number,
  order: number,
  exerciseOrder: number,
  prevState: State,
  formData: FormData
) {
  const currenUserId = 1;
  const validatedFields = WorkItemFormSchema.safeParse({
    weight: formData.get("weight"),
    rep: formData.get("rep"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "error",
    };
  }
  const { weight, rep } = validatedFields.data;

  const targetExerciseItem = await prisma.exerciseItem.findFirstOrThrow({
    where: {
      exercise: {
        workout: {
          year: year,
          month: month,
          day: day,
          authorId: currenUserId,
        },
        order: exerciseOrder,
      },
      order: order,
    },
  });
  const targetExerciseItemId = targetExerciseItem.id;

  await prisma.exerciseItem.update({
    where: {
      id: targetExerciseItemId,
    },
    data: {
      weight: weight,
      rep: rep,
    },
  });

  revalidatePath(`/workouts/${year}/${month}/${day}`);
  redirect(`/workouts/${year}/${month}/${day}`);
}

const RestItemFormSchema = z.object({
  time: z.coerce.number(),
});

export type RestItemState = {
  errors?: {
    time?: string[];
  };
  message?: string | null;
};

export async function updateRest(
  year: number,
  month: number,
  day: number,
  itemOrder: number,
  exerciseOrder: number,
  prevState: RestItemState,
  formData: FormData
) {
  const currenUserId = 1;
  const validatedFields = RestItemFormSchema.safeParse({
    time: formData.get("time"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "error",
    };
  }
  const { time } = validatedFields.data;

  const targetExerciseItem = await prisma.exerciseItem.findFirstOrThrow({
    where: {
      exercise: {
        workout: {
          year: year,
          month: month,
          day: day,
          authorId: currenUserId,
        },
        order: exerciseOrder,
      },
      order: itemOrder,
    },
  });
  const targetExerciseItemId = targetExerciseItem.id;

  await prisma.exerciseItem.update({
    where: {
      id: targetExerciseItemId,
    },
    data: {
      time,
    },
  });

  revalidatePath(`/workouts/${year}/${month}/${day}`);
  redirect(`/workouts/${year}/${month}/${day}`);
}

export async function deleteItem(
  year: number,
  month: number,
  day: number,
  exerciseOrder: number,
  itemOrder: number
) {
  const currenUserId = 1;

  const targetExerciseItem = await prisma.exerciseItem.findFirstOrThrow({
    where: {
      exercise: {
        workout: {
          year: year,
          month: month,
          day: day,
          authorId: currenUserId,
        },
        order: exerciseOrder,
      },
      order: itemOrder,
    },
  });
  const targetExerciseItemId = targetExerciseItem.id;

  await prisma.exerciseItem.delete({
    where: {
      id: targetExerciseItemId,
    },
  });

  revalidatePath(`/workouts/${year}/${month}/${day}`);
  redirect(`/workouts/${year}/${month}/${day}`);
}

export async function addItemToExercise(
  type: ExerciseItemType,
  year: number,
  month: number,
  day: number,
  exerciseOrder: number
) {
  const currenUserId = 1;
  const allExerciseItems = await prisma.exerciseItem.findMany({
    where: {
      exercise: {
        workout: {
          year,
          month,
          day,
          authorId: currenUserId,
        },
        order: exerciseOrder,
      },
    },
    select: {
      exerciseId: true,
      order: true,
    },
    orderBy: {
      order: "desc",
    },
  });

  const maxOrder = allExerciseItems[0].order;
  const targetExerciseId = allExerciseItems[0].exerciseId;

  await prisma.exerciseItem.create({
    data: {
      type,
      order: maxOrder + 1,
      exerciseId: targetExerciseId,
      authorId: currenUserId,
    },
  });

  revalidatePath(`/workouts/${year}/${month}/${day}`);
  redirect(`/workouts/${year}/${month}/${day}`);
}
