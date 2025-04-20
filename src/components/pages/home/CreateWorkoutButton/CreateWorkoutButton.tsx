"use client";
import { Button } from "@/components/ui/button";
import { createWorkoutAction } from "@/src/components/pages/home/CreateWorkoutButton/createWorkoutAction";

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
      <form action={() => createWorkoutAction(year, month, day)}>
        <Button type="submit">ワークアウトを作成</Button>
      </form>
    </div>
  );
}
