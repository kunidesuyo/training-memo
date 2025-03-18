import { WorkoutRepository } from "@/src/_repositories/workoutRepository";
import type { Workout } from "@/src/_repositories/workoutRepository";
import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";

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
