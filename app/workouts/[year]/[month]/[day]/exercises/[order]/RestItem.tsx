import React from "react";
import { ExerciseItem } from "@/app/api/workouts/[year]/[month]/[day]/exercises/[order]/route";

interface RestItemProps {
  item: ExerciseItem;
  changeTime: (
    item: ExerciseItem
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteItem: (order: number) => void;
}

const RestItem: React.FC<RestItemProps> = ({
  item,
  changeTime,
  deleteItem,
}) => {
  return (
    <div className="mb-4 mt-4" key={item.order}>
      <p>{`レスト`}</p>
      <p>時間: </p>
      <input
        type="number"
        value={item.time ?? ""}
        onChange={changeTime(item)}
        className="no-spinner"
      />
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

export default RestItem;
