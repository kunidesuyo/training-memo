import { getWorkouts, Workout } from "@/app/home/actions";
import HomeCalender from "@/app/home/homeCalender";
import SelectedWorkout from "@/app/home/selectedWorkout";
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

  const initDate = (
    searchParams?: SearchParams,
  ): { year: number; month: number; day: number } => {
    if (isAllParamsSpecified(searchParams)) {
      return {
        year: parseInt(searchParams!.year!),
        month: parseInt(searchParams!.month!),
        day: parseInt(searchParams!.day!),
      };
    }
    if (isAllParamsNotSpecified(searchParams)) {
      return todayDate();
    }
    notFound();
  };

  const { year, month, day } = initDate(searchParams);

  const workouts: Workout[] = await getWorkouts(year, month);
  const selectedDate = new Date(year, month - 1, day);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <HomeCalender workouts={workouts} selectedDate={selectedDate} />
      <SelectedWorkout selectedDate={selectedDate} />
    </div>
  );
}
