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
  year,
  month,
  day,
  exerciseOrder,
}: {
  exercise: ExerciseWithItems;
  year: number;
  month: number;
  day: number;
  exerciseOrder: number;
}) {
  return (
    <div>
      {exercise.items.map((item: ExerciseItem) => {
        return item.type === "WORK" ? (
          <WorkItemForm
            key={item.order}
            item={item}
            year={year}
            month={month}
            day={day}
            exerciseOrder={exerciseOrder}
          />
        ) : item.type === "REST" ? (
          <RestItemForm
            key={item.order}
            item={item}
            year={year}
            month={month}
            day={day}
            exerciseOrder={exerciseOrder}
          />
        ) : null;
      })}
      <div className="my-4 flex">
        <AddItemButton
          type={"WORK"}
          year={year}
          month={month}
          day={day}
          exerciseOrder={exerciseOrder}
        />
        <AddItemButton
          type={"REST"}
          year={year}
          month={month}
          day={day}
          exerciseOrder={exerciseOrder}
        />
      </div>
    </div>
  );
}
