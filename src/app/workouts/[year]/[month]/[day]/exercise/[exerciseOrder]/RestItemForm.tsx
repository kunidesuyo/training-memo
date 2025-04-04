import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Save, Timer } from "lucide-react";
import type React from "react";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import DeleteRestItemButton from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/DeleteRestItemButton";
import {
  type RestItemState,
  updateRestItemAction,
} from "@/src/app/workouts/[year]/[month]/[day]/exercise/[exerciseOrder]/updateRestItemAction";
import type { RestItem } from "@/src/services/ExerciseService";

interface RestItemFormProps {
  item: RestItem;
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
  const updateRestWithIdentifier = updateRestItemAction.bind(
    null,
    year,
    month,
    day,
    item.order,
    exerciseOrder,
  );
  const [state, formAction] = useActionState(
    updateRestWithIdentifier,
    initialState,
  );

  return (
    <Card className="my-4" key={item.order}>
      <CardContent className="flex items-center gap-4 p-4">
        <Timer className="h-5 w-5 text-sky-600" />
        <form action={formAction} className="flex items-center gap-2 flex-1">
          <Input
            name="time"
            className="w-16"
            type="number"
            defaultValue={item.time ?? ""}
          />
          <p>秒</p>
          <div id="time-error" aria-live="polite" aria-atomic="true">
            {state.errors?.time?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
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
        <DeleteRestItemButton
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
