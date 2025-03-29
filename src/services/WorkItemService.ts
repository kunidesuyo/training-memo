import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import type { ExerciseRepository } from "@/src/repositories/ExerciseRepository";
import type { WorkItemRepository } from "@/src/repositories/WorkItemRepository";

export class WorkItemService {
  constructor(
    private exerciseRepository: ExerciseRepository,
    private workItemRepository: WorkItemRepository,
  ) {}

  async addWorkItemToExercise(
    year: number,
    month: number,
    day: number,
    exerciseOrder: number,
  ) {
    const currentUser = getCurrentUser();
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

    await this.workItemRepository.addToExercise(targetExercise.id, {
      weight: 0,
      rep: 0,
      order: newItemOrder,
      authorId: currentUser.id,
    });
  }

  async deleteWorkItem(
    year: number,
    month: number,
    day: number,
    exerciseOrder: number,
    itemOrder: number,
  ) {
    const currentUser = getCurrentUser();

    const targetExercise = await this.exerciseRepository.findByDateAndOrder(
      year,
      month,
      day,
      exerciseOrder,
      currentUser.id,
    );

    await this.workItemRepository.delete(targetExercise.id, itemOrder);
  }

  async updateWorkItem(
    year: number,
    month: number,
    day: number,
    exerciseOrder: number,
    itemOrder: number,
    weight: number,
    rep: number,
  ) {
    const currentUser = getCurrentUser();

    const targetExercise = await this.exerciseRepository.findByDateAndOrder(
      year,
      month,
      day,
      exerciseOrder,
      currentUser.id,
    );

    await this.workItemRepository.update(targetExercise.id, itemOrder, {
      weight,
      rep,
    });
  }
}
