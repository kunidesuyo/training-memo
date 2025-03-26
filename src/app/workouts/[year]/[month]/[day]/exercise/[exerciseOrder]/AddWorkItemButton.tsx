import { Button } from "@/components/ui/button";
import { addWorkItemToExerciseAction } from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/addWorkItemToExerciseAction";

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
      >
        {"ワーク追加"}
      </Button>
    </form>
  );
}
