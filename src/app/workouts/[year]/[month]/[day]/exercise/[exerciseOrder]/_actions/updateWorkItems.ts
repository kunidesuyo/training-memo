"use server";

import { prisma } from "@/prisma";
import { ExerciseRepository } from "@/src/repositories/ExerciseRepository";
import { WorkItemRepository } from "@/src/repositories/WorkItemRepository";
import { WorkItemService } from "@/src/services/WorkItemService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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
  _prevState: WorkItemState,
  formData: FormData,
) {
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

  const exerciseRepository = new ExerciseRepository(prisma);
  const workItemRepository = new WorkItemRepository(prisma);
  const workItemService = new WorkItemService(
    exerciseRepository,
    workItemRepository,
  );

  await workItemService.updateWorkItem(
    year,
    month,
    day,
    exerciseOrder,
    order,
    weight,
    rep,
  );

  revalidatePath(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
  redirect(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
}
