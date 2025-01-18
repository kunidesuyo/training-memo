"use client";

import { Workout } from "@/app/home/page";
import React, { useEffect, useState } from "react";

type WorkoutWithExercise = Workout & {
  exercises: Exercise[];
};

type Exercise = {
  id: number;
  name: string;
  order: number;
};

export default function SelectedWorkout({
  selectedDate,
}: {
  selectedDate: Date | undefined;
}) {
  const [selectedWorkout, setSelectedWorkout] = useState<
    WorkoutWithExercise | undefined
  >(undefined);

  // useEffect使っていいのか調べる
  useEffect(() => {
    const fetchWorkout = async () => {
      if (selectedDate) {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const response = await fetch(
          `http://localhost:3000/api/workouts/${year}/${month}/${day}`
        );
        const workout: WorkoutWithExercise = await response.json();
        setSelectedWorkout(workout);
      }
    };

    fetchWorkout();
  }, [selectedDate]);

  return (
    <div>
      {/* {selectedDate ? (
        <div>
          <p>選択された日付</p>
          <p>{selectedDate.getFullYear()}年</p>
          <p>{selectedDate.getMonth() + 1}月</p>
          <p>{selectedDate.getDate()}日</p>
        </div>
      ) : (
        <p>日付が選択されていません。</p>
      )} */}
      {selectedWorkout ? (
        <div>
          {/* <p>ワークアウトID: {selectedWorkout.id}</p> */}
          {selectedWorkout.exercises.map(
            (exercise: Exercise, index: number) => (
              <div key={exercise.id}>
                <p>
                  エクササイズ{index + 1}: {exercise.name}
                </p>
              </div>
            )
          )}
        </div>
      ) : (
        <p>ワークアウトが見つかりませんでした。</p>
      )}
    </div>
  );
}
