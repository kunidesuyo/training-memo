import {
  getWorkoutWithExercise,
  WorkoutWithExercises,
} from "@/app/workouts/[year]/[month]/[day]/_actions/getWorkoutWithExercise";
import {
  ExerciseWithItems,
  getExercisesWithItems,
} from "@/app/workouts/[year]/[month]/[day]/_actions/getExercisesWithItems";
import AddExerciseForm from "@/app/workouts/[year]/[month]/[day]/addExerciseForm";
import ExerciseForm from "@/app/workouts/[year]/[month]/[day]/ExerciseForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default async function Workout({
  params,
}: {
  params: { year: string; month: string; day: string };
}) {
  const { year, month, day } = await params;
  // TODO: ワークアウトとそれに紐づくエクササイズを一度に取得する
  const workout: WorkoutWithExercises = await getWorkoutWithExercise(
    parseInt(year),
    parseInt(month),
    parseInt(day)
  );

  const exercises: ExerciseWithItems[] = await getExercisesWithItems(
    parseInt(year),
    parseInt(month),
    parseInt(day)
  );

  return (
    <div>
      <h2>{`${workout.year}年${workout.month}月${workout.day}日のワークアウト`}</h2>
      <div>
        <Accordion type="single" collapsible>
          {exercises.map((exercise: ExerciseWithItems) => (
            <AccordionItem
              key={exercise.id.toString()}
              value={exercise.id.toString()}
            >
              <AccordionTrigger>{exercise.name}</AccordionTrigger>
              <AccordionContent>
                <Link
                  key={exercise.id}
                  className="text-blue-500 underline mx-4 my-2"
                  href={`/workouts/${year}/${month}/${day}/exercises/${exercise.order}`}
                >
                  {exercise.name}
                </Link>
                <ExerciseForm
                  exercise={exercise}
                  pathParams={{
                    year,
                    month,
                    day,
                    order: exercise.order.toString(),
                  }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="m-4">
        <AddExerciseForm pathParams={await params} />
      </div>
    </div>
  );
}
