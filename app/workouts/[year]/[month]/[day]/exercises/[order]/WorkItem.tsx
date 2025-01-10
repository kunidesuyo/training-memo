import React from "react";
import { ExerciseItem } from "@/app/api/workouts/[year]/[month]/[day]/exercises/[order]/route";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WorkItemProps {
  item: ExerciseItem;
  changeWeight: (
    item: ExerciseItem
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeRep: (
    item: ExerciseItem
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteItem: (order: number) => void;
}

const WorkItem: React.FC<WorkItemProps> = ({
  item,
  changeWeight,
  changeRep,
  deleteItem,
}) => {
  return (
    <div className="my-4 flex" key={item.order}>
      <p>{`ワーク`}</p>
      <Input
        className="mx-2 w-100"
        type="number"
        value={item.weight ?? ""}
        onChange={changeWeight(item)}
        placeholder="重さ"
      />
      <p>kg</p>
      <Input
        className="mx-2 w-100"
        type="number"
        value={item.rep ?? ""}
        onChange={changeRep(item)}
        placeholder="回数"
      />
      <p>回</p>
      <Button
        type="button"
        className="mx-2 text-blue-500 underline"
        onClick={() => deleteItem(item.order)}
      >
        削除
      </Button>
      <p>{item.order}</p>
    </div>
  );
};

export default WorkItem;
