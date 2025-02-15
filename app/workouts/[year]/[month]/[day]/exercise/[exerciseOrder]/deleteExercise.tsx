"use client";

import { deleteExercise } from "@/app/workouts/[year]/[month]/[day]/_actions/deleteExercise";
import { Button } from "@/components/ui/button";

export default function DeleteExercise({
  year,
  month,
  day,
  exerciseOrder,
}: {
  year: number;
  month: number;
  day: number;
  exerciseOrder: number;
}) {
  return (
    <div>
      <form action={() => deleteExercise(year, month, day, exerciseOrder)}>
        <Button type="submit">削除</Button>
      </form>
    </div>
  );
}
