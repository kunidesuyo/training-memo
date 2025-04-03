"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type State,
  addExerciseAction,
} from "@/src/app/workouts/[year]/[month]/[day]/addExerciseAction";
import { useActionState } from "react";

export default function AddExerciseForm({
  pathParams,
}: {
  pathParams: { year: string; month: string; day: string };
}) {
  const { year, month, day } = pathParams;
  const initialState: State = { message: null, errors: {} };
  const addExercise_ = addExerciseAction.bind(
    null,
    Number.parseInt(year),
    Number.parseInt(month),
    Number.parseInt(day),
  );
  const [state, formAction] = useActionState(addExercise_, initialState);

  return (
    <form action={formAction}>
      <div className="flex items-center gap-4 p-4">
        <div className="w-full">
          <Input
            type="text"
            name="name"
            placeholder="エクササイズ名"
            defaultValue={""}
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        <Button
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 duration-200 text-white"
        >
          追加
        </Button>
      </div>
    </form>
  );
}
