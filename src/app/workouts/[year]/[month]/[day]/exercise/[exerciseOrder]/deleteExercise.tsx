"use client";

import { Button } from "@/components/ui/button";
import { deleteExerciseAction } from "@/src/app/workouts/[year]/[month]/[day]/deleteExerciseAction";
import { Trash2 } from "lucide-react";

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
  const handleDelete = () => {
    if (window.confirm("このエクササイズを削除してもよろしいですか？")) {
      deleteExerciseAction(year, month, day, exerciseOrder);
    }
  };

  return (
    <div>
      <Button
        onClick={handleDelete}
        variant="ghost"
        className="border border-gray-200 hover:bg-red-100 active:bg-red-200 duration-200 text-gray-500 hover:text-red-600 hover:shadow-sm flex items-center gap-1"
      >
        <Trash2 className="h-4 w-4" />
        <span className="text-xs ml-1">削除</span>
      </Button>
    </div>
  );
}
