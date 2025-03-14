"use client";

import { Button } from "@/components/ui/button";
import { deleteExercise } from "@/src/app/workouts/[year]/[month]/[day]/_actions/deleteExercise";

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
      <form action={() => deleteExercise(year, month, day, order)}>
        <Button type="submit">削除</Button>
      </form>
    </div>
  );
}
