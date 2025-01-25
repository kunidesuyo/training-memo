'use client';

import React from "react";
import { Calendar } from "@/components/ui/calendar";

import { Workout } from "@/app/home/page";
import { Matcher } from "react-day-picker";
import { usePathname, useRouter } from "next/navigation";

// TODO: 全ての日付は選択できるようにする
//   ワークアウトが存在する日は色をかえる
export default function HomeCalender({
  workouts,
  selectedDate,
}: {
  workouts: Workout[];
  selectedDate: Date;
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

  const pathname = usePathname();
  const router = useRouter();
  const showSelectedDateCalendar = (date: Date|undefined) => {
    if (!date) return;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const params = new URLSearchParams();
    params.set("year", year.toString());
    params.set("month", month.toString());
    params.set("day", day.toString());
    // ページ遷移
    const url = `${pathname}?${params.toString()}`
    router.push(url);
  }; 

  return (
    <div className="my-4 rounded-md border p-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={showSelectedDateCalendar}
        disabled={matcher}
      />
    </div>
  );
}
