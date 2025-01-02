import Form from "@/app/workouts/[year]/[month]/[day]/exercises/[order]/form";
import Link from "next/link";

// TODO: prismaから生成された型を使うように修正
export type ExerciseItem = {
  type: "WORK" | "REST";
  weight: number | null;
  rep: number | null;
  time: number | null;
  order: number;
};

export default async function exercise({
  params,
}: {
  params: { year: string; month: string; day: string; order: string };
}) {
  const { year, month, day, order } = await params;
  const exercise = await fetch(
    `http://localhost:3000/api/workouts/${year}/${month}/${day}/exercises/${order}`
  ).then((res) => res.json());

  return (
    <div>
      <Form exercise={exercise} pathParams={await params} />
      <Link
        className="text-blue-500 underline"
        href={`/workouts/${year}/${month}/${day}`}
      >
        戻る
      </Link>
    </div>
  );
}
