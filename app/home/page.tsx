import ClientComponentRoot from "@/app/home/ClientComponentRoot";

export type Workout = {
  id: number;
  year: number;
  month: number;
  day: number;
};

export default async function Page() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
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
