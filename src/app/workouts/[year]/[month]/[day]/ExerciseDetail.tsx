import RestItemDetail from "@/src/app/workouts/[year]/[month]/[day]/RestItemDetail";
import WorkItemDetail from "@/src/app/workouts/[year]/[month]/[day]/WorkItemDetail";
import type {
  Exercise,
  RestItem,
  WorkItem,
} from "@/src/services/workoutService";

type ExerciseItems = (WorkItem | RestItem)[];

function isWorkItem(item: WorkItem | RestItem): item is WorkItem {
  return "weight" in item && "rep" in item;
}

export default function ExerciseDetail({ exercise }: { exercise: Exercise }) {
  const exerciseItems: ExerciseItems = [
    ...exercise.workItems,
    ...exercise.restItems,
  ];
  const sortedExerciseItmems: ExerciseItems = exerciseItems.sort(
    (a, b) => a.order - b.order,
  );
  return (
    <div>
      {sortedExerciseItmems.map((item) => {
        return isWorkItem(item) ? (
          <WorkItemDetail key={item.order} workItem={item} />
        ) : (
          <RestItemDetail key={item.order} workItem={item} />
        );
      })}
    </div>
  );
}
