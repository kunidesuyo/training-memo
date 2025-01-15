"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

import { Workout } from "@/app/home/page";
import { Matcher } from "react-day-picker";

export default function HomeCalender({
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
  const [date, setDate] = useState<Date | undefined>(
    new Date(year, month - 1, day)
  );

  useEffect(() => {
    console.log("workouts:", workouts);
  }, [workouts]);

  const matcher: Matcher = (d: Date) => {
    return !workouts.some((workout: Workout) => {
      return (
        workout.day === d.getDate() &&
        workout.month === d.getMonth() + 1 &&
        workout.year === d.getFullYear()
      );
    });
  };

  return (
    <div className="my-4 rounded-md border p-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={matcher}
      />
    </div>
  );
}
