import Link from "next/link";

type Exercise = {
  id: number;
  name: string;
};

export default async function workout({
  params,
}: {
  params: { year: string; month: string; day: string };
}) {
  const { year, month, day } = await params;
  const workout = await fetch(
    `http://localhost:3000/api/workouts/${year}/${month}/${day}`
  ).then((res) => res.json());
  return (
    <div>
      <h2>{`${workout.year}年${workout.month}月${workout.day}日のワークアウト`}</h2>
      {workout.exercises.map((exercise: Exercise) => (
        <Link
          key={exercise.id}
          className="text-blue-500 underline"
          href={`/workouts/${year}/${month}/${day}/exercises/${exercise.id}`}
        >
          {exercise.name}
        </Link>
      ))}
    </div>
  );
}
