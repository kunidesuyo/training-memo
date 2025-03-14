"use client";
import { Button } from "@/components/ui/button";
import { createWorkout } from "@/src/app/home/_actions/createWorkout";

export default function CreateWorkoutButton({
  selectedDate,
}: {
  selectedDate: Date;
}) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();
  return (
    <div>
      <form action={() => createWorkout(year, month, day)}>
        <Button>ワークアウトを作成</Button>
      </form>
    </div>
  );
}
