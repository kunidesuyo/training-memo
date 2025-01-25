import {
  ExerciseWithItems,
  getExerciseWithItems,
} from "@/app/workouts/[year]/[month]/[day]/exercises/[order]/actions";
import ExerciseForm from "@/app/workouts/[year]/[month]/[day]/exercises/[order]/ExerciseForm";
import Link from "next/link";

export default async function exercise({
  params,
}: {
  params: { year: string; month: string; day: string; order: string };
}) {
  const { year, month, day, order } = await params;
  const exercise: ExerciseWithItems = await getExerciseWithItems(
    parseInt(year),
    parseInt(month),
    parseInt(day),
    parseInt(order)
  );

  return (
    <div className="m-10">
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
