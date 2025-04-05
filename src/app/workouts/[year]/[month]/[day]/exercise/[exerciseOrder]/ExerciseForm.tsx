"use client";

import AddRestItemButton from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/AddRestItemButton";
import AddWorkItemButton from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/AddWorkItemButton";
import RestItemForm from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/RestItemForm";
import WorkItemForm from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/WorkItemForm";
import DeleteExercise from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/deleteExercise";
import type { Exercise, RestItem, WorkItem } from "@/src/types/exercise";

// TODO: app/workouts/[year]/[month]/[day]/ExerciseDetail.tsxもある
// モデルメソッドとかに定義する？
type ExerciseItem = WorkItem | RestItem;
// 同上
function isWorkItem(item: ExerciseItem): item is WorkItem {
  return "weight" in item && "rep" in item;
}

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
  const exerciseItems: ExerciseItem[] = [
    ...exercise.workItems,
    ...exercise.restItems,
  ];
  const sortedExerciseItmems: ExerciseItem[] = exerciseItems.sort(
    (a, b) => a.order - b.order,
  );
  return (
    <div>
      {sortedExerciseItmems.map((item) => {
        return isWorkItem(item) ? (
          <WorkItemForm
            key={item.order}
            item={item}
            year={year}
            month={month}
            day={day}
            exerciseOrder={exerciseOrder}
          />
        ) : (
          <RestItemForm
            key={item.order}
            item={item}
            year={year}
            month={month}
            day={day}
            exerciseOrder={exerciseOrder}
          />
        );
      })}
      <div className="my-4 flex gap-2 justify-between">
        <div className="flex gap-2">
          <AddWorkItemButton
            year={year}
            month={month}
            day={day}
            exerciseOrder={exerciseOrder}
          />
          <AddRestItemButton
            year={year}
            month={month}
            day={day}
            exerciseOrder={exerciseOrder}
          />
        </div>
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
