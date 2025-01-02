import WorkoutCard from "@/app/workouts/WorkoutCard";
import Link from "next/link";

type Workout = {
  id: number;
  year: number;
  month: number;
  day: number;
  exercises: Exercise[];
};

type Exercise = {
  id: number;
  name: string;
};

export default async function workouts() {
  const workouts = await fetch("http://localhost:3000/api/workouts").then(
    (res) => res.json()
  );
  return (
    <div>
      <Link href="/workouts/create">新規作成</Link>
      {workouts.map((workout: Workout) => {
        return <WorkoutCard key={workout.id} workout={workout} />;
      })}
    </div>
  );
}
