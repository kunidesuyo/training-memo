import { prisma } from "@/prisma";
import HomeCalender from "@/src/app/home/homeCalender";
import SelectedWorkout from "@/src/app/home/selectedWorkout";
import { WorkoutRepository } from "@/src/repositories/WorkoutRepository";
import { type Workout, WorkoutService } from "@/src/services/WorkoutService";
import { notFound } from "next/navigation";

type SearchParams = { year?: string; month?: string; day?: string };

export default async function Page(props: {
  searchParams?: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;

  const isAllParamsSpecified = (searchParams?: SearchParams) => {
    return searchParams?.year && searchParams?.month && searchParams?.day;
  };

  const isAllParamsNotSpecified = (searchParams?: SearchParams) => {
    return !searchParams?.year && !searchParams?.month && !searchParams?.day;
  };

  const todayDate = () => {
    const date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  };

  // TODO: リファクタリング
  const initDate = (
    searchParams?: SearchParams,
  ): { year: number; month: number; day: number } => {
    if (isAllParamsSpecified(searchParams)) {
      return {
        year: Number.parseInt(searchParams?.year as string),
        month: Number.parseInt(searchParams?.month as string),
        day: Number.parseInt(searchParams?.day as string),
      };
    }
    if (isAllParamsNotSpecified(searchParams)) {
      return todayDate();
    }
    notFound();
  };

  const { year, month, day } = initDate(searchParams);

  const workoutRepository = new WorkoutRepository(prisma);
  const workoutService = new WorkoutService(workoutRepository);
  const workouts: Workout[] = await workoutService.getWorkoutsInMonth(
    year,
    month,
  );
  const selectedDate = new Date(year, month - 1, day);
  const selectedWorkout: Workout | undefined = workouts.find(
    (workout) =>
      workout.year === year && workout.month === month && workout.day === day,
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <HomeCalender workouts={workouts} selectedDate={selectedDate} />
      <SelectedWorkout
        selectedDate={selectedDate}
        selectedWorkout={selectedWorkout}
      />
    </div>
  );
}
