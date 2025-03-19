// import { prisma } from "@/prisma";
import { workoutValidator } from "@/src/types/workout";
import type { Workout } from "@/src/types/workout";
import type { PrismaClient } from "@prisma/client";

export class WorkoutRepository {
  constructor(private prisma: PrismaClient) {}
  async findByDate(
    year: number,
    month: number,
    day: number,
    authorId: number,
  ): Promise<Workout> {
    return this.prisma.workout.findUniqueOrThrow({
      where: {
        year_month_day_authorId: { year, month, day, authorId },
      },
      include: workoutValidator.include,
    });
  }
}
