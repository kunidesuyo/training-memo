import {
  Exercise,
  getWorkoutWithExercise,
  WorkoutWithExercises,
} from "@/app/home/actions";
import CreateWorkoutButton from "@/app/home/createWorkoutButton";
import Link from "next/link";
import React from "react";

export default async function SelectedWorkout({
  selectedDate,
}: {
  selectedDate: Date;
}) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();
  const selectedWorkout: WorkoutWithExercises | null =
    await getWorkoutWithExercise(year, month, day);

  return (
    <div>
      {selectedDate ? (
        <div>
          <p>選択された日付</p>
          <p>
            {year}年{month}月{day}日
          </p>
        </div>
      ) : (
        <p>日付を選択してください。</p>
      )}

      {selectedWorkout ? (
        <div>
          {selectedWorkout.exercises?.map(
            (exercise: Exercise, index: number) => (
              <div key={exercise.id}>
                <p>
                  エクササイズ{index + 1}: {exercise.name}
                </p>
              </div>
            )
          )}
          <Link href={`/workouts/${year}/${month}/${day}/`}>
            ワークアウト詳細へ
          </Link>
        </div>
      ) : (
        <div>
          <p>ワークアウトが見つかりませんでした。</p>
          <CreateWorkoutButton selectedDate={selectedDate} />
        </div>
      )}
    </div>
  );
}
