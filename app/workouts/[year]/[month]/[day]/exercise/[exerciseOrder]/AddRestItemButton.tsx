import { addRestItemToExercise } from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/_actions/addRestItemToExercise";
import { Button } from "@/components/ui/button";
import React from "react";

export default function AddRestItemButton({
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
    <form>
      <Button
        formAction={() =>
          addRestItemToExercise(year, month, day, exerciseOrder)
        }
      >
        {"レスト追加"}
      </Button>
    </form>
  );
}
