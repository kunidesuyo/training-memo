"use client";

import {
  Exercise,
  ExerciseItem,
} from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/_actions/getExercise";
import AddItemButton from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/AddItemButton";
import DeleteExercise from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/deleteExercise";
import RestItemForm from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/RestItemForm";
import WorkItemForm from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/WorkItemForm";

export default function ExerciseForm({
  exercise,
  year,
  month,
  day,
  exerciseOrder,
}: {
  exercise: Exercise;
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
      <div>
        <DeleteExercise
          year={year}
          month={month}
          day={day}
          exerciseOrder={exerciseOrder}
        />
      </div>
    </div>
  );
}
