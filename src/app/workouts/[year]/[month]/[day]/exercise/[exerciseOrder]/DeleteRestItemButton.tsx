"use client";

import { Button } from "@/components/ui/button";
import { deleteRestItemAction } from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/deleteRestItemAction";

export default function DeleteRestItemButton({
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
      action={() =>
        deleteRestItemAction(year, month, day, exerciseOrder, itemOrder)
      }
    >
      <Button type="submit">削除</Button>
    </form>
  );
}
