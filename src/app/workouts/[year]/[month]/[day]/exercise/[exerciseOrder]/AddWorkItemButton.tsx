import { Button } from "@/components/ui/button";
import { addWorkItemToExerciseAction } from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/addWorkItemToExerciseAction";
import { Dumbbell, Plus } from "lucide-react";

export default function AddWorkItemButton({
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
          addWorkItemToExerciseAction(year, month, day, exerciseOrder)
        }
        variant="ghost"
        className="border border-gray-200 hover:bg-sky-100 active:bg-sky-200 duration-200 text-gray-500 hover:text-sky-600 hover:shadow-sm flex items-center gap-1"
      >
        <Plus className="h-4 w-4" />
        <Dumbbell className="h-4 w-4" />
      </Button>
    </form>
  );
}
