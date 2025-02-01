"use client";

import {
  ExerciseItem,
  ExerciseWithItems,
} from "@/app/workouts/[year]/[month]/[day]/_actions/getWorkout";
import AddItemButton from "@/app/workouts/[year]/[month]/[day]/AddItemButton";
import RestItemForm from "@/app/workouts/[year]/[month]/[day]/RestItemForm";
import WorkItemForm from "@/app/workouts/[year]/[month]/[day]/WorkItemForm";

export default function ExerciseForm({
  exercise,
  pathParams,
}: {
  exercise: ExerciseWithItems;
  pathParams: { year: string; month: string; day: string; order: string };
}) {
  const { year, month, day, order } = pathParams;

  return (
    <div>
      <h2>{exercise.name}</h2>
      {exercise.items.map((item: ExerciseItem) => {
        return item.type === "WORK" ? (
          <WorkItemForm
            key={item.order}
            item={item}
            year={parseInt(year)}
            month={parseInt(month)}
            day={parseInt(day)}
            exerciseOrder={parseInt(order)}
          />
        ) : item.type === "REST" ? (
          <RestItemForm
            key={item.order}
            item={item}
            year={parseInt(year)}
            month={parseInt(month)}
            day={parseInt(day)}
            exerciseOrder={parseInt(order)}
          />
        ) : null;
      })}
      <div className="my-4">
        <AddItemButton
          type={"WORK"}
          year={parseInt(year)}
          month={parseInt(month)}
          day={parseInt(day)}
          exerciseOrder={parseInt(order)}
        />
        <AddItemButton
          type={"REST"}
          year={parseInt(year)}
          month={parseInt(month)}
          day={parseInt(day)}
          exerciseOrder={parseInt(order)}
        />
      </div>
    </div>
  );
}
