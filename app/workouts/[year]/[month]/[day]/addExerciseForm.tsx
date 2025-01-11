"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AddExerciseForm({
  pathParams,
}: {
  pathParams: { year: string; month: string; day: string };
}) {
  const { year, month, day } = pathParams;
  const [exerciseName, setExerciseName] = useState("");

  const addExercise = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetch(
      `http://localhost:3000/api/workouts/${year}/${month}/${day}/exercises`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: exerciseName,
        }),
      }
    );
  };

  return (
    <form onSubmit={addExercise} className="flex items-center">
      <Input
        className="w-100"
        type="text"
        placeholder="エクササイズ名"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
      />
      <Button type="submit" className="mx-2 underline">
        エクササイズ追加
      </Button>
    </form>
  );
}
