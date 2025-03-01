import {
  Exercise,
  getExercise,
} from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/_actions/getExercise";
import ExerciseForm from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/ExerciseForm";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { year: string; month: string; day: string; exerciseOrder: string };
}) {
  const { year, month, day, exerciseOrder } = await params;
  const exercise: Exercise = await getExercise(
    parseInt(year),
    parseInt(month),
    parseInt(day),
    parseInt(exerciseOrder),
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
          year={parseInt(year)}
          month={parseInt(month)}
          day={parseInt(day)}
          exerciseOrder={parseInt(exerciseOrder)}
        />
      </div>
    </div>
  );
}
