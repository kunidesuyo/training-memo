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

  async findManyByYearAndMonth(
    year: number,
    month: number,
    authorId: number,
  ): Promise<Workout[]> {
    return this.prisma.workout.findMany({
      where: {
        year,
        month,
        authorId,
      },
      include: workoutValidator.include,
    });
  }

  async create(year: number, month: number, day: number, authorId: number) {
    await this.prisma.workout.create({
      data: {
        year,
        month,
        day,
        authorId,
      },
    });
  }
}
