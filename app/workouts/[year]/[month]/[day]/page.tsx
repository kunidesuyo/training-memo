import {
  Exercise,
  getWorkoutWithExercise,
  WorkoutWithExercises,
} from "@/app/workouts/[year]/[month]/[day]/actions";
import AddExerciseForm from "@/app/workouts/[year]/[month]/[day]/addExerciseForm";
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
  const workout: WorkoutWithExercises = await getWorkoutWithExercise(
    parseInt(year),
    parseInt(month),
    parseInt(day)
  );

  return (
    <div>
      <h2>{`${workout.year}年${workout.month}月${workout.day}日のワークアウト`}</h2>
      <div>
        <Accordion type="single" collapsible>
          {workout.exercises?.map((exercise: Exercise) => (
            <AccordionItem value={exercise.id.toString()}>
              <AccordionTrigger>{exercise.name}</AccordionTrigger>
              <AccordionContent>
                <Link
                  key={exercise.id}
                  className="text-blue-500 underline mx-4 my-2"
                  href={`/workouts/${year}/${month}/${day}/exercises/${exercise.order}`}
                >
                  {exercise.name}
                </Link>
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
