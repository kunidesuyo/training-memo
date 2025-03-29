"use server";

import { prisma } from "@/prisma";
import { ExerciseRepository } from "@/src/repositories/ExerciseRepository";
import { RestItemRepository } from "@/src/repositories/RestItemRepository";
import { RestItemService } from "@/src/services/RestItemService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const RestItemFormSchema = z.object({
  time: z.coerce.number(),
});

export type RestItemState = {
  errors?: {
    time?: string[];
  };
  message?: string | null;
};

export async function updateRestItems(
  year: number,
  month: number,
  day: number,
  itemOrder: number,
  exerciseOrder: number,
  _prevState: RestItemState,
  formData: FormData,
) {
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

  const exerciseRepository = new ExerciseRepository(prisma);
  const restItemRepository = new RestItemRepository(prisma);
  const restItemService = new RestItemService(
    exerciseRepository,
    restItemRepository,
  );

  await restItemService.updateRestItem(
    year,
    month,
    day,
    exerciseOrder,
    itemOrder,
    time,
  );

  revalidatePath(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
  redirect(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
}
