"use client";

import { Button } from "@/components/ui/button";
import { deleteRestItemAction } from "@/src/components/pages/exercise/deleteRestItemAction";
import { Trash2 } from "lucide-react";

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
      <Button
        type="submit"
        className="bg-transparent hover:bg-sky-200 active:bg-sky-300 duration-200 text-gray-500 hover:text-sky-700 hover:shadow-sm"
        size="icon"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </form>
  );
}
