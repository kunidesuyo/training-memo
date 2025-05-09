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
import type { Exercise } from "@/src/services/ExerciseService";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const router = useRouter();

  const handleClick = () => {
    if (nextExercise) {
      const order = nextExercise.order;
      router.push(`/workouts/${year}/${month}/${day}/exercise/${order}`);
    } else {
      setOpen(true);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="text-blue-500 hover:text-blue-600"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>エクササイズの作成</DialogTitle>
            <DialogDescription>
              次のエクササイズが存在しません。作成しますか？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit">作成する</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
