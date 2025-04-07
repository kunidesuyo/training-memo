import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import type { ExerciseRepository } from "@/src/repositories/ExerciseRepository";
import type { RestItemRepository } from "@/src/repositories/RestItemRepository";

export class RestItemService {
  constructor(
    private exerciseRepository: ExerciseRepository,
    private restItemRepository: RestItemRepository,
  ) {}

  async addRestItemToExercise(
    year: number,
    month: number,
    day: number,
    exerciseOrder: number,
  ) {
    const currentUser = await getCurrentUser();
    const targetExercise = await this.exerciseRepository.findByDateAndOrder(
      year,
      month,
      day,
      exerciseOrder,
      currentUser.id,
    );

    // TODO: ここのロジックを共通化したい
    const targetExerciseItems = [
      ...targetExercise.workItems,
      ...targetExercise.restItems,
    ];
    const newItemOrder =
      targetExerciseItems.length === 0
        ? 1
        : Math.max(...targetExerciseItems.map((item) => item.order)) + 1;

    await this.restItemRepository.addToExercise(targetExercise.id, {
      time: 0,
      order: newItemOrder,
      authorId: currentUser.id,
    });
  }

  async deleteRestItem(
    year: number,
    month: number,
    day: number,
    exerciseOrder: number,
    itemOrder: number,
  ) {
    const currentUser = await getCurrentUser();

    const targetExercise = await this.exerciseRepository.findByDateAndOrder(
      year,
      month,
      day,
      exerciseOrder,
      currentUser.id,
    );

    await this.restItemRepository.delete(targetExercise.id, itemOrder);
  }

  async updateRestItem(
    year: number,
    month: number,
    day: number,
    exerciseOrder: number,
    itemOrder: number,
    time: number,
  ) {
    const currentUser = await getCurrentUser();

    const targetExercise = await this.exerciseRepository.findByDateAndOrder(
      year,
      month,
      day,
      exerciseOrder,
      currentUser.id,
    );

    await this.restItemRepository.update(targetExercise.id, itemOrder, {
      time,
    });
  }
}
