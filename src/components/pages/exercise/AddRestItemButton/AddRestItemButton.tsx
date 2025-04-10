import { Button } from "@/components/ui/button";
import { addRestItemToExerciseAction } from "@/src/components/pages/exercise/AddRestItemButton/addRestItemToExerciseAction";
import { Plus, Timer } from "lucide-react";

export default function AddRestItemButton({
  year,
  month,
  day,
  exerciseOrder,
}: {
  year: number;
  month: number;
  day: number;
  exerciseOrder: number;
}) {
  return (
    <form>
      <Button
        formAction={() =>
          addRestItemToExerciseAction(year, month, day, exerciseOrder)
        }
        variant="ghost"
        size="icon"
        className="border border-gray-200 hover:bg-sky-100 active:bg-sky-200 duration-200 text-gray-500 hover:text-sky-600 hover:shadow-sm flex items-center justify-center w-14 p-2"
      >
        <Plus className="h-4 w-4" />
        <Timer className="h-4 w-4" />
      </Button>
    </form>
  );
}
