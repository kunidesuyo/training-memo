"use client";
import { Calendar } from "@/components/ui/calendar";
import type { Workout } from "@/src/services/WorkoutService";
import { usePathname, useRouter } from "next/navigation";

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
    (workout: Workout) =>
      new Date(workout.year, workout.month - 1, workout.day),
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
    <div className="my-4 rounded-md border p-4 max-w-[85%] w-full">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={showSelectedDateCalendar}
        onMonthChange={showSelectedDateCalendar}
        modifiers={{ workoutDay: workoutDays }}
        modifiersClassNames={{ workoutDay: "bg-sky-400" }}
      />
    </div>
  );
}
