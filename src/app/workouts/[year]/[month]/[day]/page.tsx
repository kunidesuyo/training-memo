import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma";
import ExerciseDetail from "@/src/app/workouts/[year]/[month]/[day]/ExerciseDetail";
import AddExerciseForm from "@/src/app/workouts/[year]/[month]/[day]/addExerciseForm";
import DeleteExercise from "@/src/app/workouts/[year]/[month]/[day]/deleteExercise";
import { WorkoutRepository } from "@/src/repositories/WorkoutRepository";
import type { Exercise, Workout } from "@/src/services/WorkoutService";
import { WorkoutService } from "@/src/services/WorkoutService";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { year: string; month: string; day: string };
}) {
  // 認証チェック
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

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
      <div className="mx-2">
        <Accordion type="single" collapsible>
          {workout.exercises.map((exercise: Exercise) => (
            <AccordionItem
              key={exercise.id.toString()}
              value={exercise.id.toString()}
            >
              <AccordionTrigger>{exercise.name}</AccordionTrigger>
              <AccordionContent>
                <ExerciseDetail exercise={exercise} />
                <div className="flex justify-start">
                  <DeleteExercise
                    year={Number.parseInt(year)}
                    month={Number.parseInt(month)}
                    day={Number.parseInt(day)}
                    order={exercise.order}
                  />
                  <Link
                    href={`/workouts/${year}/${month}/${day}/exercise/${exercise.order}`}
                  >
                    <Button
                      variant="default"
                      className="ml-2 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 duration-200 text-white"
                    >
                      詳細
                    </Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="my-4 mx-2">
        <AddExerciseForm pathParams={await params} />
      </div>
    </div>
  );
}
