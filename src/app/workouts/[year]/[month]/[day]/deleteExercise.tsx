"use client";

import { Button } from "@/components/ui/button";
import { deleteExerciseAction } from "@/src/app/workouts/[year]/[month]/[day]/deleteExerciseAction";

export default function DeleteExercise({
  year,
  month,
  day,
  order,
}: {
  year: number;
  month: number;
  day: number;
  order: number;
}) {
  return (
    <div>
      <form action={() => deleteExerciseAction(year, month, day, order)}>
        <Button
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 duration-200 text-white"
        >
          削除
        </Button>
      </form>
    </div>
  );
}
