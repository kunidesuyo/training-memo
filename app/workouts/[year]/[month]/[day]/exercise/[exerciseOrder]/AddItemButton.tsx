import { addItemToExercise } from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/_actions/addItemToExercise";
import { Button } from "@/components/ui/button";
// import { ExerciseItemType } from "@prisma/client";
import React from "react";

export default function AddItemButton({
  type,
  year,
  month,
  day,
  exerciseOrder,
}: {
  type: "WORK" | "REST";
  year: number;
  month: number;
  day: number;
  exerciseOrder: number;
}) {
  const buttonLabel = () => {
    switch (type) {
      case "WORK":
        return "ワーク";
      case "REST":
        return "レスト";
      default:
        return "";
    }
  };
  return (
    <form>
      <Button
        formAction={() =>
          addItemToExercise(type, year, month, day, exerciseOrder)
        }
      >
        {buttonLabel() + "追加"}
      </Button>
    </form>
  );
}
