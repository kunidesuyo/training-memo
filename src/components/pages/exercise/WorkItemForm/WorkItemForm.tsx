import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dumbbell, Save } from "lucide-react";
import type React from "react";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import DeleteWorkItemButton from "@/src/components/pages/exercise/DeleteWorkItemButton/DeleteWorkItemButton";
import {
  type WorkItemState,
  updateWorkItemAction,
} from "@/src/components/pages/exercise/WorkItemForm/updateWorkItemAction";
import type { WorkItem } from "@/src/services/ExerciseService";

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
  const updateExerciseItemsWithIdentifier = updateWorkItemAction.bind(
    null,
    year,
    month,
    day,
    item.order,
    exerciseOrder,
  );
  const [state, formAction] = useActionState(
    updateExerciseItemsWithIdentifier,
    initialState,
  );
  return (
    <Card className="my-4" key={item.order}>
      <CardContent className="flex items-center p-3 gap-1">
        <Dumbbell className="h-4 w-4 text-sky-600" />
        <form action={formAction} className="flex items-center gap-1 flex-1">
          <Input
            name="weight"
            className="w-14 ml-2"
            type="number"
            defaultValue={item.weight ?? ""}
            placeholder="重さ"
          />
          <p>kg</p>
          <div id="weight-error" aria-live="polite" aria-atomic="true">
            {state.errors?.weight?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
          <Input
            name="rep"
            className="w-12 ml-2"
            type="number"
            defaultValue={item.rep ?? ""}
            placeholder="回数"
          />
          <p>回</p>
          <div id="rep-error" aria-live="polite" aria-atomic="true">
            {state.errors?.rep?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
          <div className="ml-auto flex items-center">
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="hover:bg-sky-100 active:bg-sky-200 duration-200 text-gray-500 hover:text-sky-600 hover:shadow-sm"
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>
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
