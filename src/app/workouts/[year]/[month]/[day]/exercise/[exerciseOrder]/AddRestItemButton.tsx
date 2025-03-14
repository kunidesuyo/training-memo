import { Button } from "@/components/ui/button";
import { addRestItemToExercise } from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/_actions/addRestItemToExercise";

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
          addRestItemToExercise(year, month, day, exerciseOrder)
        }
      >
        {"レスト追加"}
      </Button>
    </form>
  );
}
