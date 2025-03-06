import { getWorkout, Workout, Exercise } from "@/app/home/_actions/getWorkout";
import CreateWorkoutButton from "@/app/home/createWorkoutButton";
import Link from "next/link";
import React from "react";

const formatDate = (selectedDate: Date) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();
  return { year, month, day };
};

const renderSelectedDate = (selectedDate: Date) => {
  const { year, month, day } = formatDate(selectedDate);
  return (
    <div>
      <p>選択された日付</p>
      <p>
        {year}年{month}月{day}日
      </p>
    </div>
  );
};

const renderWorkoutDetails = (
  selectedWorkout: Workout,
  year: number,
  month: number,
  day: number
) => {
  return (
    <div>
      {selectedWorkout.exercises?.map((exercise: Exercise, index: number) => (
        <div key={exercise.id}>
          <p>
            エクササイズ{index + 1}: {exercise.name}
          </p>
        </div>
      ))}
      <Link href={`/workouts/${year}/${month}/${day}/`}>
        ワークアウト詳細へ
      </Link>
    </div>
  );
};

export default async function SelectedWorkout({
  selectedDate,
}: {
  selectedDate: Date;
}) {
  const { year, month, day } = formatDate(selectedDate);
  const selectedWorkout: Workout | null = await getWorkout(year, month, day);

  return (
    <div>
      {selectedDate ? (
        renderSelectedDate(selectedDate)
      ) : (
        <p>日付を選択してください。</p>
      )}
      {selectedWorkout ? (
        renderWorkoutDetails(selectedWorkout, year, month, day)
      ) : (
        <div>
          <p>ワークアウトが見つかりませんでした。</p>
          <CreateWorkoutButton selectedDate={selectedDate} />
        </div>
      )}
    </div>
  );
}
