"use client";

import { Button } from "@/components/ui/button";
import { deleteExerciseAction } from "@/src/components/pages/workouts/deleteExerciseAction";
import { Trash2 } from "lucide-react";

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
          className="bg-transparent hover:bg-sky-200 active:bg-sky-300 duration-200 text-gray-500 hover:text-sky-700 hover:shadow-sm"
          size="icon"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
