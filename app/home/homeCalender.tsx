"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { usePathname, useRouter } from "next/navigation";
import { Workout } from "@/app/home/_actions/getWorkouts";

export default function HomeCalender({
  workouts,
  selectedDate,
}: {
  workouts: Workout[];
  selectedDate: Date;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const workoutDays = workouts.map(
    (workout: Workout) => new Date(workout.year, workout.month - 1, workout.day)
  );

  const showSelectedDateCalendar = (date: Date | undefined) => {
    if (!date) return;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const params = new URLSearchParams();
    params.set("year", year.toString());
    params.set("month", month.toString());
    params.set("day", day.toString());
    const url = `${pathname}?${params.toString()}`;
    router.push(url);
  };

  return (
    <div className="my-4 rounded-md border p-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={showSelectedDateCalendar}
        onMonthChange={showSelectedDateCalendar}
        modifiers={{ workoutDay: workoutDays }}
        modifiersClassNames={{ workoutDay: "bg-red-900" }}
      />
    </div>
  );
}
