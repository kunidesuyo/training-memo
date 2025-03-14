import { Button } from "@/components/ui/button";
import { addWorkItemToExercise } from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/_actions/addWorkItemToExercise";

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
          addWorkItemToExercise(year, month, day, exerciseOrder)
        }
      >
        {"ワーク追加"}
      </Button>
    </form>
  );
}
