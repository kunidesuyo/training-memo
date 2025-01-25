import { Workout } from "@/app/home/page";
import Link from "next/link";
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
          <p>
            選択された日付
            {year}年{month}月{day}日
          </p>
        </div>
      ) : (
        <p>ワークアウトが存在する日付を選択してください。</p>
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
        // TODO: 新しくワークアウトを作成できるようにする
      )}
      <Link
        href="/workouts/[year]/[month]/[day]"
        as={`/workouts/${year}/${month}/${day}`}
      >詳細</Link>
    </div>
  );
}
