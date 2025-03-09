import React, { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WorkItem } from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/_actions/getExercise";
import {
  WorkItemState,
  updateWorkItems,
} from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/_actions/updateWorkItems";
import DeleteWorkItemButton from "@/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/DeleteWorkItemButton";

interface WorkItemFormProps {
  item: WorkItem;
  year: number;
  month: number;
  day: number;
  exerciseOrder: number;
}

const WorkItemForm: React.FC<WorkItemFormProps> = ({
  item,
  year,
  month,
  day,
  exerciseOrder,
}) => {
  const initialState: WorkItemState = { message: null, errors: {} };
  const updateExerciseItemsWithIdentifier = updateWorkItems.bind(
    null,
    year,
    month,
    day,
    item.order,
    exerciseOrder
  );
  const [state, formAction] = useActionState(
    updateExerciseItemsWithIdentifier,
    initialState
  );
  return (
    <Card className="my-4" key={item.order}>
      <CardContent className="flex p-4">
        <p>{`ワーク`}</p>
        <form action={formAction} className="flex">
          <Input
            name="weight"
            className="mx-2 w-100"
            type="number"
            defaultValue={item.weight ?? ""}
            placeholder="重さ"
          />
          <p>kg</p>
          <div id="weight-error" aria-live="polite" aria-atomic="true">
            {state.errors?.weight &&
              state.errors.weight.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <Input
            name="rep"
            className="mx-2 w-100"
            type="number"
            defaultValue={item.rep ?? ""}
            placeholder="回数"
          />
          <p>回</p>
          <div id="weight-error" aria-live="polite" aria-atomic="true">
            {state.errors?.rep &&
              state.errors.rep.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <Button type="submit" className="mx-2 underline">
            更新
          </Button>
        </form>
        <DeleteWorkItemButton
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

export default WorkItemForm;
