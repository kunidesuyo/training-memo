import { Button } from "@/components/ui/button";
import { addRestItemToExerciseAction } from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/addRestItemToExerciseAction";

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
      >
        {"レスト追加"}
      </Button>
    </form>
  );
}
