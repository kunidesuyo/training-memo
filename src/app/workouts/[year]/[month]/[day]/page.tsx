import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { prisma } from "@/prisma";
import ExerciseDetail from "@/src/app/workouts/[year]/[month]/[day]/ExerciseDetail";
import AddExerciseForm from "@/src/app/workouts/[year]/[month]/[day]/addExerciseForm";
import DeleteExercise from "@/src/app/workouts/[year]/[month]/[day]/deleteExercise";
import { WorkoutRepository } from "@/src/repositories/WorkoutRepository";
import type { Exercise, Workout } from "@/src/services/WorkoutService";
import { WorkoutService } from "@/src/services/WorkoutService";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { year: string; month: string; day: string };
}) {
  const { year, month, day } = await params;
  // DIコンテナ導入する？
  const workoutRepository = new WorkoutRepository(prisma);
  const workoutService = new WorkoutService(workoutRepository);
  const workout: Workout = await workoutService.getWorkout(
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
