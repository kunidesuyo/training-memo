"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/prisma";
import { getCurrentUser } from "@/app/_utils/getCurrentUser";

const WorkItemFormSchema = z.object({
  weight: z.coerce.number(),
  rep: z.coerce.number(),
});

export type WorkItemState = {
  errors?: {
    weight?: string[];
    rep?: string[];
  };
  message?: string | null;
};

export async function updateWorkItems(
  year: number,
  month: number,
  day: number,
  order: number,
  exerciseOrder: number,
  prevState: WorkItemState,
  formData: FormData
) {
  const { id: currentUserId } = getCurrentUser();
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

  const targetExerciseItem = await prisma.workExerciseItem.findFirstOrThrow({
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
      order: order,
    },
  });
  const targetExerciseItemId = targetExerciseItem.id;

  await prisma.workExerciseItem.update({
    where: {
      id: targetExerciseItemId,
    },
    data: {
      weight: weight,
      rep: rep,
    },
  });

  revalidatePath(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
  redirect(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
}
