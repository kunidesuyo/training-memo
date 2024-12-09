import ExerciseCard from "@/app/exercises/ExerciseCard";
import Link from "next/link";

export default async function exercises() {
  const exercises = await fetch('http://localhost:3000/api/exercises').then((res) => res.json());
  return (
    <div>
      <Link href="/exercises/create">新規作成</Link>
      {exercises.map((exercise: any) => {
        return (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        );
      })}
    </div>
  );
}
