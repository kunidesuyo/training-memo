"use client";

import { Workout } from "@/app/home/page";
import React, { useEffect, useState } from "react";

export default function SelectedWorkout({
  selectedDate,
}: {
  selectedDate: Date | undefined;
}) {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | undefined>(
    undefined
  );

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
        const workout: Workout = await response.json();
        setSelectedWorkout(workout);
      }
    };

    fetchWorkout();
  }, [selectedDate]);

  return (
    <div>
      {selectedDate ? (
        <div>
          <p>選択された日付</p>
          <p>{selectedDate.getFullYear()}年</p>
          <p>{selectedDate.getMonth() + 1}月</p>
          <p>{selectedDate.getDate()}日</p>
          {selectedWorkout ? (
            <div>
              <p>ワークアウトID: {selectedWorkout.id}</p>
              {/* 他のワークアウトの詳細をここに表示 */}
            </div>
          ) : (
            <p>ワークアウトが見つかりませんでした。</p>
          )}
        </div>
      ) : (
        <p>日付が選択されていません。</p>
      )}
    </div>
  );
}
