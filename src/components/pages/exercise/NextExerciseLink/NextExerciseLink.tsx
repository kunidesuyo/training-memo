import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function NextExerciseLink({
  props,
}: {
  props: {
    year: number;
    month: number;
    day: number;
    order: number;
  };
}) {
  const { year, month, day, order } = props;

  return (
    <Link href={`/workouts/${year}/${month}/${day}/exercise/${order}`}>
      <Button variant="ghost" className="hover:bg-transparent">
        <ChevronRight className="w-5 h-5 text-sky-500" />
      </Button>
    </Link>
  );
}
