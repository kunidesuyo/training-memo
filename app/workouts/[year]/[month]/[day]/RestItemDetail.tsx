import { ExerciseItem } from "@/app/workouts/[year]/[month]/[day]/_actions/getWorkout";
import { Card, CardContent } from "@/components/ui/card";

export default function RestItemDetail({
  workItem,
}: {
  workItem: ExerciseItem;
}) {
  return (
    <div>
      <Card className="my-4" key={workItem.order}>
        <CardContent className="flex p-4">
          <p>{`レスト`}</p>
          <p>{workItem.time}</p>
          <p>秒</p>
        </CardContent>
      </Card>
    </div>
  );
}
