import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import type { ExerciseRepository } from "@/src/repositories/ExerciseRepository";
import type { WorkoutRepository } from "@/src/repositories/WorkoutRepository";

export type { Exercise, WorkItem, RestItem } from "@/src/types/exercise";

export class ExerciseService {
  constructor(
    private workoutRepository: WorkoutRepository,
    private exerciseRepository: ExerciseRepository,
  ) {}

  async getExercise(
    year: number,
    month: number,
    day: number,
    exerciseOrder: number,
  ) {
    const currentUser = await getCurrentUser();
    return this.exerciseRepository.findByDateAndOrder(
      year,
      month,
      day,
      exerciseOrder,
      currentUser.id,
    );
  }

  async addExerciseToWorkout(
    year: number,
    month: number,
    day: number,
    name: string,
  ) {
    const currentUser = await getCurrentUser();
    const targetWorkout = await this.workoutRepository.findByDate(
      year,
      month,
      day,
      currentUser.id,
    );

    const maxExerciseOrder = targetWorkout.exercises.reduce(
      (acc, cur) => Math.max(acc, cur.order),
      0,
    );
    const newExerciseOrder = maxExerciseOrder + 1;
    const exerciseData = {
      name,
      order: newExerciseOrder,
      authorId: currentUser.id,
    };

    await this.exerciseRepository.addToWorkout(targetWorkout.id, exerciseData);
  }

  async deleteExercise(
    year: number,
    month: number,
    day: number,
    exerciseOrder: number,
  ) {
    const currentUser = await getCurrentUser();
    const targetWorkout = await this.workoutRepository.findByDate(
      year,
      month,
      day,
      currentUser.id,
    );

    await this.exerciseRepository.delete(targetWorkout.id, exerciseOrder);
  }
}
