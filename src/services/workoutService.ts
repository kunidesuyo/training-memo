import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import { WorkoutRepository } from "@/src/repositories/workoutRepository";
import type { Workout } from "@/src/types/workout";

export type {
  Workout,
  Exercise,
  WorkItem,
  RestItem,
} from "@/src/types/workout";

export class WorkoutService {
  private workoutRepository: WorkoutRepository;

  constructor() {
    this.workoutRepository = new WorkoutRepository();
  }

  async getWorkout(year: number, month: number, day: number): Promise<Workout> {
    const { id: currentUserId } = getCurrentUser();
    return this.workoutRepository.findByDate(year, month, day, currentUserId);
  }
}
