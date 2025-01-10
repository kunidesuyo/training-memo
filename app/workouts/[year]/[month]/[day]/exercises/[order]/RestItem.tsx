import React from "react";
import { ExerciseItem } from "@/app/api/workouts/[year]/[month]/[day]/exercises/[order]/route";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="my-4 w-[600px]" key={item.order}>
      <CardContent className="flex p-4">
        <p>{`レスト`}</p>
        <Input
          className="mx-2 w-100"
          type="number"
          value={item.time ?? ""}
          onChange={changeTime(item)}
        />
        <p>秒</p>
        <Button
          type="button"
          className="mx-2 text-blue-500 underline"
          onClick={() => deleteItem(item.order)}
        >
          削除
        </Button>
        <p>{item.order}</p>
      </CardContent>
    </Card>
  );
};

export default RestItem;
