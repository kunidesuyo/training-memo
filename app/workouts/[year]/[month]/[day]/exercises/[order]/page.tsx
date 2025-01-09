import ExerciseForm from "@/app/workouts/[year]/[month]/[day]/exercises/[order]/ExerciseForm";
import Link from "next/link";

export default async function exercise({
  params,
}: {
  params: { year: string; month: string; day: string; order: string };
}) {
  const { year, month, day, order } = await params;
  const exercise = await fetch(
    `http://localhost:3000/api/workouts/${year}/${month}/${day}/exercises/${order}`
  ).then((res) => res.json());

  return (
    <div>
      <ExerciseForm exercise={exercise} pathParams={await params} />
      <Link
        className="text-blue-500 underline"
        href={`/workouts/${year}/${month}/${day}`}
      >
        戻る
      </Link>
    </div>
  );
}
