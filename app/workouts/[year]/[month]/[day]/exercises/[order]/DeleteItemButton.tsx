"use client";

import { deleteItem } from "@/app/workouts/[year]/[month]/[day]/exercises/[order]/actions";
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
    <div>
      <Button
        formAction={() =>
          deleteItem(year, month, day, exerciseOrder, itemOrder)
        }
      >
        削除
      </Button>
    </div>
  );
}
