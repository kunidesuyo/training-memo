"use server";

import { prisma } from "@/prisma";
import { ExerciseRepository } from "@/src/repositories/ExerciseRepository";
import { RestItemRepository } from "@/src/repositories/RestItemRepository";
import { RestItemService } from "@/src/services/RestItemService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteRestItem(
  year: number,
  month: number,
  day: number,
  exerciseOrder: number,
  itemOrder: number,
) {
  const exerciseRepository = new ExerciseRepository(prisma);
  const restItemRepository = new RestItemRepository(prisma);
  const restItemService = new RestItemService(
    exerciseRepository,
    restItemRepository,
  );

  await restItemService.deleteRestItem(
    year,
    month,
    day,
    exerciseOrder,
    itemOrder,
  );

  // const { id: currentUserId } = getCurrentUser();
  // const targetExerciseItem = await prisma.restExerciseItem.findFirstOrThrow({
  //   where: {
  //     exercise: {
  //       workout: {
  //         year: year,
  //         month: month,
  //         day: day,
  //         authorId: currentUserId,
  //       },
  //       order: exerciseOrder,
  //     },
  //     order: itemOrder,
  //   },
  // });
  // const targetExerciseItemId = targetExerciseItem.id;

  // await prisma.restExerciseItem.delete({
  //   where: {
  //     id: targetExerciseItemId,
  //   },
  // });

  revalidatePath(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
  redirect(`/workouts/${year}/${month}/${day}/exercise/${exerciseOrder}`);
}
