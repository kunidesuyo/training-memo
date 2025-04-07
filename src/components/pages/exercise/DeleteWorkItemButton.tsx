"use client";

import { Button } from "@/components/ui/button";
import { deleteWorkItemAction } from "@/src/components/pages/exercise/deleteWorkItemAction";
import { Trash2 } from "lucide-react";

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
      action={() =>
        deleteWorkItemAction(year, month, day, exerciseOrder, itemOrder)
      }
    >
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="bg-transparent hover:bg-sky-200 active:bg-sky-300 duration-200 text-gray-500 hover:text-sky-700 hover:shadow-sm"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </form>
  );
}
