import AddExerciseForm from "@/app/workouts/[year]/[month]/[day]/addExerciseForm";
import ExerciseForm from "@/app/workouts/[year]/[month]/[day]/ExerciseForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getWorkout } from "@/app/workouts/[year]/[month]/[day]/_actions/getWorkout";
import type {
  ExerciseWithItems,
  Workout,
} from "@/app/workouts/[year]/[month]/[day]/_actions/getWorkout";
import DeleteExercise from "@/app/workouts/[year]/[month]/[day]/deleteExercise";
import Link from "next/link";

export default async function Workout({
  params,
}: {
  params: { year: string; month: string; day: string };
}) {
  const { year, month, day } = await params;
  const workout: Workout = await getWorkout(
    parseInt(year),
    parseInt(month),
    parseInt(day)
  );

  return (
    <div>
      <h2>{`${year}年${month}月${day}日のワークアウト`}</h2>
      <div>
        <Accordion type="single" collapsible>
          {workout.exercises.map((exercise: ExerciseWithItems) => (
            <AccordionItem
              key={exercise.id.toString()}
              value={exercise.id.toString()}
            >
              <AccordionTrigger>{exercise.name}</AccordionTrigger>
              <AccordionContent>
                <DeleteExercise
                  year={parseInt(year)}
                  month={parseInt(month)}
                  day={parseInt(day)}
                  order={exercise.order}
                />
                <Link
                  href={`/workouts/${year}/${month}/${day}/exercise/${exercise.order}`}
                >
                  詳細
                </Link>
                <ExerciseForm
                  exercise={exercise}
                  year={parseInt(year)}
                  month={parseInt(month)}
                  day={parseInt(day)}
                  exerciseOrder={exercise.order}
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
