import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import type { ExerciseRepository } from "@/src/repositories/exerciseRepository";
import type { WorkoutRepository } from "@/src/repositories/workoutRepository";

export class ExerciseService {
  constructor(
    private workoutRepository: WorkoutRepository,
    private exerciseRepository: ExerciseRepository,
  ) {}

  async addExerciseToWorkout(
    year: number,
    month: number,
    day: number,
    name: string,
  ) {
    const currentUser = getCurrentUser();
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
}
