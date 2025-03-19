import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import type { WorkoutRepository } from "@/src/repositories/workoutRepository";
import type { Workout } from "@/src/types/workout";

export type {
  Workout,
  Exercise,
  WorkItem,
  RestItem,
} from "@/src/types/workout";

export class WorkoutService {
  constructor(private workoutRepository: WorkoutRepository) {}

  async getWorkout(year: number, month: number, day: number): Promise<Workout> {
    const { id: currentUserId } = getCurrentUser();
    return this.workoutRepository.findByDate(year, month, day, currentUserId);
  }
}
