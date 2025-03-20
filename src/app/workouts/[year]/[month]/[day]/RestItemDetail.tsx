import { Card, CardContent } from "@/components/ui/card";
import type { RestItem } from "@/src/services/WorkoutService";

export default function RestItemDetail({
  workItem,
}: {
  workItem: RestItem;
}) {
  return (
    <div>
      <Card className="my-4" key={workItem.order}>
        <CardContent className="flex p-4">
          <p>{"レスト"}</p>
          <p>{workItem.time}</p>
          <p>秒</p>
        </CardContent>
      </Card>
    </div>
  );
}
