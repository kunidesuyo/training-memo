import React from "react";
import { ExerciseItem } from "@/app/api/workouts/[year]/[month]/[day]/exercises/[order]/route";

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
    <div className="mb-4 mt-4" key={item.order}>
      <p>{`ワーク`}</p>
      <p>重さ: </p>
      <input
        type="number"
        value={item.weight ?? ""}
        onChange={changeWeight(item)}
      />
      <p>回数: </p>
      <input type="number" value={item.rep ?? ""} onChange={changeRep(item)} />
      <p>{item.order}</p>
      <button
        type="button"
        className="mx-2 text-blue-500 underline"
        onClick={() => deleteItem(item.order)}
      >
        削除
      </button>
    </div>
  );
};

export default WorkItem;
