"use client";

import HomeCalender from "@/app/home/homeCalender";
import { Workout } from "@/app/home/page";
import SelectedWorkout from "@/app/home/selectedWorkout";
import React, { useState } from "react";

export default function ClientComponentRoot({
  year,
  month,
  day,
  workouts,
}: {
  year: number;
  month: number;
  day: number;
  workouts: Workout[];
}) {
  // 選択した日付はsearchParamsで管理する
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(year, month - 1, day)
  );
  return (
    <div>
      <HomeCalender
        workouts={workouts}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <SelectedWorkout selectedDate={selectedDate} />
    </div>
  );
}
