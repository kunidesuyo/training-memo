import React, { useActionState } from "react";
import { ExerciseItem } from "@/app/api/workouts/[year]/[month]/[day]/exercises/[order]/route";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { State, updateExerciseItems } from "@/app/workouts/[year]/[month]/[day]/exercises/[order]/actions";

interface WorkItemProps {
  item: ExerciseItem;
  year: number;
  month: number;
  day: number;
  exerciseOrder: number;
}

const WorkItem: React.FC<WorkItemProps> = ({
  item,
  year,
  month,
  day,
  exerciseOrder,
}) => {
  const initialState: State = { message: null, errors: {} };
  const updateExerciseItemsWithIdentifier = updateExerciseItems.bind(null, year, month, day, item.order, exerciseOrder);
  const [state, formAction] = useActionState(updateExerciseItemsWithIdentifier, initialState);
  return (
    <Card className="my-4 w-[600px]" key={item.order}>
      <CardContent className="flex p-4">
        <p>{`ワーク`}</p>
        <form action={formAction}>
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
          <Button
            type="submit"
            className="mx-2 underline"
          >
            更新
          </Button>
          {/* TODO: ボタン追加 */}
          <p>
            削除
          </p>
          {/* <Button
            type="button"
            className="mx-2 underline"
            onClick={() => deleteItem(item.order)}
          >
            削除
          </Button> */}
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkItem;
