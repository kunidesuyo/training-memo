"use client";

import type { Exercise } from "@/src/services/ExerciseService";
import { ChevronRight } from "lucide-react";

export default function NextExercise({
  props,
}: {
  props: { nextExercise: Exercise | null };
}) {
  const { nextExercise } = props;

  const handleClick = () => {
    console.log(nextExercise);
    // TODO: nextExerciseの有無で処理分岐
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="text-blue-500 hover:text-blue-600"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
