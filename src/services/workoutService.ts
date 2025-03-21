import { getCurrentUser } from "@/src/app/_utils/getCurrentUser";
import type { WorkoutRepository } from "@/src/repositories/WorkoutRepository";
import type { Workout } from "@/src/types/workout";

export type {
  Workout,
  Exercise,
  WorkItem,
  RestItem,
} from "@/src/types/workout";

// getCurrentUserをDIする？
export class WorkoutService {
  constructor(private workoutRepository: WorkoutRepository) {}

  async getWorkout(year: number, month: number, day: number): Promise<Workout> {
    const { id: currentUserId } = getCurrentUser();
    return this.workoutRepository.findByDate(year, month, day, currentUserId);
  }

  async getWorkoutsInMonth(year: number, month: number): Promise<Workout[]> {
    const { id: currentUserId } = getCurrentUser();
    return this.workoutRepository.findManyByYearAndMonth(
      year,
      month,
      currentUserId,
    );
  }

  async createWorkout(year: number, month: number, day: number) {
    const { id: currentUserId } = getCurrentUser();
    this.workoutRepository.create(year, month, day, currentUserId);
  }
}
