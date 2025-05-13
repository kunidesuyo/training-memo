"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  type State,
  addExerciseAction,
} from "@/src/components/pages/exercise/NextExercise/addExerciseAction";
import NextExerciseLink from "@/src/components/pages/exercise/NextExerciseLink/NextExerciseLink";
import type { Exercise } from "@/src/services/ExerciseService";
import { useActionState, useState } from "react";

// TODO: 次のエクササイズがある場合とない場合でコンポーネントを分ける
export default function NextExercise({
  props,
}: {
  props: {
    year: number;
    month: number;
    day: number;
    nextExercise: Exercise | null;
  };
}) {
  const [open, setOpen] = useState(false);
  const { year, month, day, nextExercise } = props;
  // const router = useRouter();

  const initialState: State = { message: null, errors: {} };
  const addExercise_ = addExerciseAction.bind(null, year, month, day);
  const [state, formAction] = useActionState(addExercise_, initialState);

  // const handleClick = () => {
  //   if (nextExercise) {
  //     const order = nextExercise.order;
  //     router.push(`/workouts/${year}/${month}/${day}/exercise/${order}`);
  //   } else {
  //     setOpen(true);
  //   }
  // };

  return (
    <div>
      {nextExercise ? (
        <NextExerciseLink
          props={{ year, month, day, order: nextExercise.order }}
        />
      ) : (
        // 次のエクササイズが存在しない場合は作成ダイアログを表示する
        // コンポーネントを分ける(Client Component)
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>エクササイズの作成</DialogTitle>
              <DialogDescription>
                次のエクササイズが存在しません。作成しますか？
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
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
                  <Button type="submit">作成</Button>
                </div>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
