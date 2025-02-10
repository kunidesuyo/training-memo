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
