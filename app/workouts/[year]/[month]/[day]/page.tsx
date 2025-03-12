import ExerciseDetail from "@/app/workouts/[year]/[month]/[day]/ExerciseDetail";
import { getWorkout } from "@/app/workouts/[year]/[month]/[day]/_actions/getWorkout";
import type {
  Exercise,
  Workout,
} from "@/app/workouts/[year]/[month]/[day]/_actions/getWorkout";
import AddExerciseForm from "@/app/workouts/[year]/[month]/[day]/addExerciseForm";
import DeleteExercise from "@/app/workouts/[year]/[month]/[day]/deleteExercise";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { year: string; month: string; day: string };
}) {
  const { year, month, day } = await params;
  const workout: Workout = await getWorkout(
    Number.parseInt(year),
    Number.parseInt(month),
    Number.parseInt(day),
  );

  return (
    <div>
      <h2>{`${year}年${month}月${day}日のワークアウト`}</h2>
      <div>
        <Accordion type="single" collapsible>
          {workout.exercises.map((exercise: Exercise) => (
            <AccordionItem
              key={exercise.id.toString()}
              value={exercise.id.toString()}
            >
              <AccordionTrigger>{exercise.name}</AccordionTrigger>
              <AccordionContent>
                <DeleteExercise
                  year={Number.parseInt(year)}
                  month={Number.parseInt(month)}
                  day={Number.parseInt(day)}
                  order={exercise.order}
                />
                <Link
                  href={`/workouts/${year}/${month}/${day}/exercise/${exercise.order}`}
                >
                  詳細
                </Link>
                <ExerciseDetail exercise={exercise} />
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
