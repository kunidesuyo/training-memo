"use client";

import React, { useState } from "react";
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
  const [selectedDate, setDate] = useState<Date | undefined>(
    new Date(year, month - 1, day)
  );

  const isSameDay = (date: Date, workout: Workout) => {
    return (
      date.getDate() === workout.day &&
      date.getMonth() + 1 === workout.month &&
      date.getFullYear() === workout.year
    );
  };

  const matcher: Matcher = (date: Date) => {
    return !workouts.some((workout: Workout) => {
      return isSameDay(date, workout);
    });
  };

  return (
    <div className="my-4 rounded-md border p-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setDate}
        disabled={matcher}
      />
    </div>
  );
}
