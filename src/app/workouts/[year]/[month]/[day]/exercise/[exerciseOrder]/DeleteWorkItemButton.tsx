"use client";

import { Button } from "@/components/ui/button";
import { deleteWorkItem } from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/_actions/deleteWorkItem";

export default function DeleteWorkItemButton({
  year,
  month,
  day,
  exerciseOrder,
  itemOrder,
}: {
  year: number;
  month: number;
  day: number;
  exerciseOrder: number;
  itemOrder: number;
}) {
  return (
    <form
      action={() => deleteWorkItem(year, month, day, exerciseOrder, itemOrder)}
    >
      <Button type="submit">削除</Button>
    </form>
  );
}
