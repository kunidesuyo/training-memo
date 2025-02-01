import { addItemToExercise } from "@/app/workouts/[year]/[month]/[day]/actions_";
import { Button } from "@/components/ui/button";
import { ExerciseItemType } from "@prisma/client";
import React from "react";

export default function AddItemButton({
  type,
  year,
  month,
  day,
  exerciseOrder,
}: {
  type: ExerciseItemType;
  year: number;
  month: number;
  day: number;
  exerciseOrder: number;
}) {
  return (
    <form>
      {type === "WORK" ? (
        <Button
          formAction={() =>
            addItemToExercise(type, year, month, day, exerciseOrder)
          }
        >
          ワーク追加
        </Button>
      ) : type === "REST" ? (
        <Button
          formAction={() =>
            addItemToExercise(type, year, month, day, exerciseOrder)
          }
        >
          レスト追加
        </Button>
      ) : null}
    </form>
  );
}
