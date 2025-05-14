"use client";

import {} from "@/components/ui/dialog";
import CreateNextExerciseButton from "@/src/components/pages/exercise/CreateNextExerciseButton/CreateNextExerciseButton";
import {} from "@/src/components/pages/exercise/NextExercise/addExerciseAction";
import NextExerciseLink from "@/src/components/pages/exercise/NextExerciseLink/NextExerciseLink";
import type { Exercise } from "@/src/services/ExerciseService";
import {} from "react";

// TODO: 次のエクササイズがある場合とない場合でコンポーネントを分ける
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

  return (
    <div>
      {nextExercise ? (
        <NextExerciseLink
          props={{ year, month, day, order: nextExercise.order }}
        />
      ) : (
        <CreateNextExerciseButton props={{ year, month, day }} />
      )}
    </div>
  );
}
