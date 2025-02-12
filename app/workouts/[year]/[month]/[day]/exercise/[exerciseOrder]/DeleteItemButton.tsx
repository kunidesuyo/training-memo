"use client";

import { deleteItem } from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/_actions/deleteItem";
import { Button } from "@/components/ui/button";
import React from "react";

export default function DeleteItemButton({
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
    <form action={() => deleteItem(year, month, day, exerciseOrder, itemOrder)}>
      <Button type="submit">削除</Button>
    </form>
  );
}
