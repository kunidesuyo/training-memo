"use server";

import { prisma } from "@/prisma";
import { ExerciseRepository } from "@/src/repositories/ExerciseRepository";
import { WorkoutRepository } from "@/src/repositories/WorkoutRepository";
import { ExerciseService } from "@/src/services/ExerciseService";
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
  name: z.string().min(1, { message: "エクササイズ名を入力してください" }),
});

export async function createNextExerciseAction(
  year: number,
  month: number,
  day: number,
  _prevState: State,
  formData: FormData,
) {
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

  // orderを指定してエクササイズを作成
  const workoutRepository = new WorkoutRepository(prisma);
  const exerciseRepository = new ExerciseRepository(prisma);
  const exerciseService = new ExerciseService(
    workoutRepository,
    exerciseRepository,
  );
  exerciseService.addExerciseToWorkout(year, month, day, name);

  // リダイレクト先は作成したエクササイズのページ
  revalidatePath(`/workouts/${year}/${month}/${day}`);
  redirect(`/workouts/${year}/${month}/${day}`);
}
