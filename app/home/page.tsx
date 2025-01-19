import HomeCalender from "@/app/home/homeCalender";
import SelectedWorkout from "@/app/home/selectedWorkout";

export type Workout = {
  id: number;
  year: number;
  month: number;
  day: number;
};

// 日付のデフォルト値は今日の日付
export default async function Page(props: {
  searchParams?: Promise<{
    year?: string;
    month?: string;
    day?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const date = new Date();
  const thisYear = date.getFullYear();
  const thisMonth = date.getMonth() + 1;
  const today = date.getDate();
  const year = searchParams?.year ? parseInt(searchParams.year) : thisYear;
  const month = searchParams?.month ? parseInt(searchParams.month) : thisMonth;
  const day = searchParams?.day ? parseInt(searchParams.day) : today;
  const workouts: Workout[] = await fetch(
    `http://localhost:3000/api/workouts/${year}/${month}`
  ).then((res) => res.json());
  const selectedDate = new Date(year, month - 1, day);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <HomeCalender workouts={workouts} selectedDate={selectedDate} />
      <SelectedWorkout selectedDate={selectedDate} />
    </div>
  );
}
