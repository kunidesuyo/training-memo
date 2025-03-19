import { prisma } from "@/prisma";
import { workoutValidator } from "@/src/types/workout";
import type { Workout } from "@/src/types/workout";

export class WorkoutRepository {
  async findByDate(
    year: number,
    month: number,
    day: number,
    authorId: number,
  ): Promise<Workout> {
    return prisma.workout.findUniqueOrThrow({
      where: {
        year_month_day_authorId: { year, month, day, authorId },
      },
      include: workoutValidator.include,
    });
  }
}
