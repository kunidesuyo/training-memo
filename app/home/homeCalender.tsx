"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";

import { Workout } from "@/app/home/page";
import { Matcher } from "react-day-picker";

export default function HomeCalender({
  workouts,
  selectedDate,
  setSelectedDate,
}: {
  workouts: Workout[];
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  const isSameDay = (date: Date, workout: Workout): boolean => {
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
        onSelect={setSelectedDate}
        disabled={matcher}
      />
    </div>
  );
}
