import ClientComponentRoot from "@/app/home/ClientComponentRoot";

export type Workout = {
  id: number;
  year: number;
  month: number;
  day: number;
};

// searchParamsから選択した日付を受け取る
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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ClientComponentRoot
        year={year}
        month={month}
        day={day}
        workouts={workouts}
      />
    </div>
  );
}
