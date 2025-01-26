"use client";

import {
  ExerciseItem,
  ExerciseWithItems,
} from "@/app/workouts/[year]/[month]/[day]/exercises/[order]/actions";
import RestItemForm from "@/app/workouts/[year]/[month]/[day]/exercises/[order]/RestItemForm";
import WorkItemForm from "@/app/workouts/[year]/[month]/[day]/exercises/[order]/WorkItemForm";

export default function ExerciseForm({
  exercise,
  pathParams,
}: {
  exercise: ExerciseWithItems;
  pathParams: { year: string; month: string; day: string; order: string };
}) {
  const { year, month, day } = pathParams;

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
            exerciseOrder={exercise.order}
          />
        ) : item.type === "REST" ? (
          <RestItemForm
            key={item.order}
            item={item}
            year={parseInt(year)}
            month={parseInt(month)}
            day={parseInt(day)}
            exerciseOrder={exercise.order}
          />
        ) : null;
      })}
      {/* <div className="my-4">
          <Button type="button" className="mx-2 underline" onClick={addWork}>
            ワーク追加
          </Button>
          <Button type="button" className="mx-2 underline" onClick={addRest}>
            レスト追加
          </Button>
          <Button type="submit" className="mx-2 underline">
            更新
          </Button>
        </div> */}
    </div>
  );
}
