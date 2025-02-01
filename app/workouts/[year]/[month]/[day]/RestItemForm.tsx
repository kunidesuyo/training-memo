import React, { useActionState } from "react";
import { ExerciseItem } from "@/app/api/workouts/[year]/[month]/[day]/exercises/[order]/route";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import DeleteItemButton from "@/app/workouts/[year]/[month]/[day]/DeleteItemButton";
import {
  RestItemState,
  updateRest,
} from "@/app/workouts/[year]/[month]/[day]/actions_";

interface RestItemFormProps {
  item: ExerciseItem;
  year: number;
  month: number;
  day: number;
  exerciseOrder: number;
}

const RestItemForm: React.FC<RestItemFormProps> = ({
  item,
  year,
  month,
  day,
  exerciseOrder,
}) => {
  const initialState: RestItemState = { message: null, errors: {} };
  const updateRestWithIdentifier = updateRest.bind(
    null,
    year,
    month,
    day,
    item.order,
    exerciseOrder
  );
  const [state, formAction] = useActionState(
    updateRestWithIdentifier,
    initialState
  );

  return (
    <Card className="my-4 w-[600px]" key={item.order}>
      <CardContent className="flex p-4">
        <p>{`レスト`}</p>
        <form action={formAction}>
          <Input
            name="time"
            className="mx-2 w-100"
            type="number"
            defaultValue={item.time ?? ""}
          />
          <p>秒</p>
          <div id="time-error" aria-live="polite" aria-atomic="true">
            {state.errors?.time &&
              state.errors.time.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <Button type="submit" className="mx-2 underline">
            更新
          </Button>
          <p>{item.order}</p>
        </form>
        <DeleteItemButton
          year={year}
          month={month}
          day={day}
          exerciseOrder={exerciseOrder}
          itemOrder={item.order}
        />
      </CardContent>
    </Card>
  );
};

export default RestItemForm;
