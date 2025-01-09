"use client";

import { ExerciseItem } from "@/app/api/workouts/[year]/[month]/[day]/exercises/[order]/route";
import RestItem from "@/app/workouts/[year]/[month]/[day]/exercises/[order]/RestItem";
import WorkItem from "@/app/workouts/[year]/[month]/[day]/exercises/[order]/WorkItem";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const ExerciseItemSchema = z.object({
  order: z.number(),
  time: z.number().nullable(),
  type: z.enum(["WORK", "REST"]),
  weight: z.number().nullable(),
  rep: z.number().nullable(),
});

export default function ExerciseForm({
  exercise,
  pathParams,
}: {
  exercise: { name: string; items: ExerciseItem[] };
  pathParams: { year: string; month: string; day: string; order: string };
}) {
  const [exerciseItems, setExerciseItems] = useState(exercise.items);
  const { year, month, day, order } = pathParams;
  const router = useRouter();

  const updateExerciseItem =
    (item: ExerciseItem, key: keyof ExerciseItem) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newExerciseItems = exerciseItems.map((exerciseItem) => {
        if (exerciseItem.order === item.order) {
          return { ...exerciseItem, [key]: Number(event.target.value) };
        } else {
          return exerciseItem;
        }
      });
      setExerciseItems(newExerciseItems);
    };

  const changeWeight = (item: ExerciseItem) =>
    updateExerciseItem(item, "weight");
  const changeRep = (item: ExerciseItem) => updateExerciseItem(item, "rep");
  const changeTime = (item: ExerciseItem) => updateExerciseItem(item, "time");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      ExerciseItemSchema.array().parse(exerciseItems);
    } catch (e) {
      alert(`Invalid input ${e}`);
      return;
    }
    console.log("valid input");
    const response = await fetch(
      `http://localhost:3000/api/workouts/${year}/${month}/${day}/exercises/${order}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: exerciseItems }),
      }
    );
    if (response.ok) {
      router.push(`/workouts/${year}/${month}/${day}/exercises/${order}`);
    } else {
      alert("Failed to update exercise.");
    }
  };

  const addWork = () => {
    const newOrder = exerciseItems.length + 1;
    const newExerciseItems: ExerciseItem[] = [
      ...exerciseItems,
      { type: "WORK", weight: 0, rep: 0, time: null, order: newOrder },
    ];
    setExerciseItems(newExerciseItems);
  };

  const addRest = () => {
    const newOrder = exerciseItems.length + 1;
    const newExerciseItems: ExerciseItem[] = [
      ...exerciseItems,
      { type: "REST", weight: null, rep: null, time: 0, order: newOrder },
    ];
    setExerciseItems(newExerciseItems);
  };

  const deleteItem = (order: number) => {
    const deletedExerciseItems = exerciseItems.filter(
      (item) => item.order !== order
    );
    const newExerciseItems = deletedExerciseItems.map((item, index) => {
      item.order = index + 1;
      return item;
    });
    setExerciseItems(newExerciseItems);
  };

  return (
    <div>
      <h2>{exercise.name}</h2>
      <form onSubmit={handleSubmit}>
        {exerciseItems.map((item: ExerciseItem) => {
          return item.type === "WORK" ? (
            <WorkItem
              key={item.order}
              item={item}
              changeWeight={changeWeight}
              changeRep={changeRep}
              deleteItem={deleteItem}
            />
          ) : item.type === "REST" ? (
            <RestItem
              key={item.order}
              item={item}
              changeTime={changeTime}
              deleteItem={deleteItem}
            />
          ) : null;
        })}
        <button
          type="button"
          className="mx-2 text-blue-500 underline"
          onClick={addWork}
        >
          ワーク追加
        </button>
        <button
          type="button"
          className="mx-2 text-blue-500 underline"
          onClick={addRest}
        >
          レスト追加
        </button>
        <button type="submit" className="mx-2 text-blue-500 underline">
          更新
        </button>
      </form>
    </div>
  );
}
