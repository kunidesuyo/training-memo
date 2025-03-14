"use server";

import { prisma } from "@/prisma";
import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

const ExerciseFormSchema = z.object({
  name: z.string().min(1),
});

export async function addExercise(
  year: number,
  month: number,
  day: number,
  _prevState: State,
  formData: FormData,
) {
  const { id: currentUserId } = getCurrentUser();
  const validatedFields = ExerciseFormSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "error",
    };
  }
  const { name } = validatedFields.data;
  // TODO: 以下のもっと綺麗に書けそう
  const workout = await prisma.workout.findFirstOrThrow({
    where: {
      year: year,
      month: month,
      day: day,
      authorId: currentUserId,
    },
    select: {
      id: true,
      exercises: {
        select: {
          order: true,
        },
      },
    },
  });
  const workoutId = workout?.id;
  const maxOrder = workout?.exercises.reduce(
    (acc, cur) => Math.max(acc, cur.order),
    0,
  );
  const newOrder = maxOrder + 1;
  await prisma.exercise.create({
    data: {
      name: name,
      workoutId,
      order: newOrder,
      authorId: currentUserId,
    },
  });
  revalidatePath(`/workouts/${year}/${month}/${day}`);
  redirect(`/workouts/${year}/${month}/${day}`);
}
