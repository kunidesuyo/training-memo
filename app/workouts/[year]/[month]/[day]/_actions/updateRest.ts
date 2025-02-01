"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/prisma";
import { getCurrentUser } from "@/app/_utils/getCurrentUser";

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
  const { id: currentUserId } = getCurrentUser();
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
          authorId: currentUserId,
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
