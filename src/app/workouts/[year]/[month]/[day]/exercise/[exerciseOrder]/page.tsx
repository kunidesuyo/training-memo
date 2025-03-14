import ExerciseForm from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/ExerciseForm";
import {
  type Exercise,
  getExercise,
} from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/_actions/getExercise";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { year: string; month: string; day: string; exerciseOrder: string };
}) {
  const { year, month, day, exerciseOrder } = await params;
  const exercise: Exercise = await getExercise(
    Number.parseInt(year),
    Number.parseInt(month),
    Number.parseInt(day),
    Number.parseInt(exerciseOrder),
  );

  return (
    <div className="m-4">
      <Link className="m-4" href={`/workouts/${year}/${month}/${day}`}>
        戻る
      </Link>
      <h2 className="m-4">{exercise.name}</h2>
      <div className="m-4">
        <ExerciseForm
          exercise={exercise}
          year={Number.parseInt(year)}
          month={Number.parseInt(month)}
          day={Number.parseInt(day)}
          exerciseOrder={Number.parseInt(exerciseOrder)}
        />
      </div>
    </div>
  );
}
