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
    <Link
      href={`/workouts/${year}/${month}/${day}/exercise/${order}`}
      className="text-blue-500 hover:text-blue-600"
    >
      <ChevronRight className="w-5 h-5" />
    </Link>
  );
}
