import { Card, CardContent } from "@/components/ui/card";
import type { WorkItem } from "@/src/services/WorkoutService";

export default function WorkItemDetail({
  workItem,
}: {
  workItem: WorkItem;
}) {
  return (
    <div>
      <Card className="my-4" key={workItem.order}>
        <CardContent className="flex p-4">
          <p>{"ワーク"}</p>
          <p>{workItem.weight}</p>
          <p>kg</p>
          <p>{workItem.rep}</p>
          <p>回</p>
        </CardContent>
      </Card>
    </div>
  );
}
