import { ExerciseWithItems } from "@/app/workouts/[year]/[month]/[day]/_actions/getWorkout";
import RestItemDetail from "@/app/workouts/[year]/[month]/[day]/RestItemDetail";
import WorkItemDetail from "@/app/workouts/[year]/[month]/[day]/WorkItemDetail";

export default function ExerciseDetail({
  exercise,
}: {
  exercise: ExerciseWithItems;
}) {
  return (
    <div>
      {exercise.items.map((item) => {
        return item.type === "WORK" ? (
          <WorkItemDetail key={item.order} workItem={item} />
        ) : item.type === "REST" ? (
          <RestItemDetail key={item.order} workItem={item} />
        ) : null;
      })}
    </div>
  );
}
