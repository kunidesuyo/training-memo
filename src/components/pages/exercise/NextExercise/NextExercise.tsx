"use client";

import type { Exercise } from "@/src/services/ExerciseService";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NextExercise({
  props,
}: {
  props: {
    year: number;
    month: number;
    day: number;
    nextExercise: Exercise | null;
  };
}) {
  const { year, month, day, nextExercise } = props;
  const router = useRouter();

  const handleClick = () => {
    if (nextExercise) {
      const order = nextExercise.order;
      router.push(`/workouts/${year}/${month}/${day}/exercise/${order}`);
    } else {
      console.log("create next exercise");
    }
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
