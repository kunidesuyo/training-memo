import WorkoutCard from "@/app/workouts/WorkouCard";
import Link from "next/link";

export default async function workouts() {
  const workouts = await fetch('http://localhost:3000/api/workouts').then((res) => res.json());
  return (
    <div>
      <Link href="/workouts/create">新規作成</Link>
      {workouts.map((workout: any) => {
        return (
          <WorkoutCard key={workout.id} workout={workout} />
        );
      })}
    </div>
  );
}
