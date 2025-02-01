"use client";

import {
  addExercise,
  State,
} from "@/app/workouts/[year]/[month]/[day]/_actions/addExercise";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

export default function AddExerciseForm({
  pathParams,
}: {
  pathParams: { year: string; month: string; day: string };
}) {
  const { year, month, day } = pathParams;
  const initialState: State = { message: null, errors: {} };
  const addExercise_ = addExercise.bind(
    null,
    parseInt(year),
    parseInt(month),
    parseInt(day)
  );
  const [state, formAction] = useActionState(addExercise_, initialState);

  return (
    <form action={formAction}>
      <div className="flex">
        <div>
          <Input
            className="w-[300px]"
            type="text"
            name="name"
            placeholder="エクササイズ名"
            defaultValue={""}
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <Button type="submit" className="mx-2 underline">
          エクササイズ追加
        </Button>
      </div>
    </form>
  );
}
