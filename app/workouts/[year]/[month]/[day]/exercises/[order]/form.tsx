"use client";

import { ExerciseItem } from "@/app/api/workouts/[year]/[month]/[day]/exercises/[order]/route";
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

export default function Form({
  exercise,
  pathParams,
}: {
  exercise: { name: string; items: ExerciseItem[] };
  pathParams: { year: string; month: string; day: string; order: string };
}) {
  const [exerciseItems, setExerciseItems] = useState(exercise.items);
  const { year, month, day, order } = pathParams;
  const router = useRouter();

  const changeWeight =
    (item: ExerciseItem) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newExerciseItems = exerciseItems.map((exerciseItem) => {
        if (exerciseItem.order === item.order) {
          return { ...exerciseItem, weight: Number(event.target.value) };
        } else {
          return exerciseItem;
        }
      });
      setExerciseItems(newExerciseItems);
    };

  const changeRep =
    (item: ExerciseItem) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newExerciseItems = exerciseItems.map((exerciseItem) => {
        if (exerciseItem.order === item.order) {
          return { ...exerciseItem, rep: Number(event.target.value) };
        } else {
          return exerciseItem;
        }
      });
      setExerciseItems(newExerciseItems);
    };

  const changeTime =
    (item: ExerciseItem) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newExerciseItems = exerciseItems.map((exerciseItem) => {
        if (exerciseItem.order === item.order) {
          return { ...exerciseItem, time: Number(event.target.value) };
        } else {
          return exerciseItem;
        }
      });
      setExerciseItems(newExerciseItems);
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      ExerciseItemSchema.array().parse(exerciseItems);
    } catch (e) {
      alert(`Invalid input ${e}`);
      return;
    }
    console.log('valid input');
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
          if (item.type === "WORK") {
            return (
              <div className="mb-4 mt-4" key={item.order}>
                <p>{`ワーク`}</p>
                <p>重さ: </p>
                <input
                  type="number"
                  value={item.weight!}
                  onChange={changeWeight(item)}
                />
                <p>回数: </p>
                <input
                  type="number"
                  value={item.rep!}
                  onChange={changeRep(item)}
                />
                <p>{item.order}</p>
                <button
                  type="button"
                  className="mx-2 text-blue-500 underline"
                  onClick={() => deleteItem(item.order)}
                >
                  削除
                </button>
              </div>
            );
          } else if (item.type === "REST") {
            return (
              <div className="mb-4 mt-4" key={item.order}>
                <p>{`レスト`}</p>
                <p>時間: </p>
                <input
                  type="number"
                  value={item.time!}
                  onChange={changeTime(item)}
                />
                <p>{item.order}</p>
                <button
                  type="button"
                  className="mx-2 text-blue-500 underline"
                  onClick={() => deleteItem(item.order)}
                >
                  削除
                </button>
              </div>
            );
          } else {
            return null;
          }
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
