import { Card, CardContent } from "@/components/ui/card";
import type { WorkItem } from "@/src/services/WorkoutService";
import { Dumbbell } from "lucide-react";

export default function WorkItemDetail({
  workItem,
}: {
  workItem: WorkItem;
}) {
  return (
    <div>
      <Card className="my-4" key={workItem.order}>
        <CardContent className="flex items-center gap-4 p-4">
          <Dumbbell className="h-5 w-5 text-sky-600" />
          <div className="flex items-center gap-1">
            <span className="text-lg font-medium">{workItem.weight}</span>
            <span className="text-sm text-gray-500">kg</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg font-medium">{workItem.rep}</span>
            <span className="text-sm text-gray-500">回</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
