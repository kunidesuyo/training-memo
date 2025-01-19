import { Workout } from "@/app/home/page";
import React from "react";

type WorkoutWithExercise = Workout & {
  exercises: Exercise[];
};

type Exercise = {
  id: number;
  name: string;
  order: number;
};

export default async function SelectedWorkout({
  selectedDate,
}: {
  selectedDate: Date;
}) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();
  const response = await fetch(
    `http://localhost:3000/api/workouts/${year}/${month}/${day}`
  );
  const selectedWorkout: WorkoutWithExercise = await response.json();

  return (
    <div>
      {selectedDate ? (
        <div>
          <p>選択された日付</p>
          <p>{year}年</p>
          <p>{month}月</p>
          <p>{day}日</p>
        </div>
      ) : (
        <p>日付が選択されていません。</p>
      )}
      {selectedWorkout ? (
        <div>
          <p>ワークアウトID: {selectedWorkout.id}</p>
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
