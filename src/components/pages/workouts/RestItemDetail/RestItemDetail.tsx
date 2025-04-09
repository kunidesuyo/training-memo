import { Card, CardContent } from "@/components/ui/card";
import type { RestItem } from "@/src/services/WorkoutService";
import { Timer } from "lucide-react";

export default function RestItemDetail({
  workItem,
}: {
  workItem: RestItem;
}) {
  return (
    <div>
      <Card className="my-4" key={workItem.order}>
        <CardContent className="flex items-center gap-4 p-4">
          <Timer className="h-5 w-5 text-sky-600" />
          <div className="flex items-center gap-1">
            <span className="text-lg font-medium">{workItem.time}</span>
            <span className="text-sm text-gray-500">秒</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
