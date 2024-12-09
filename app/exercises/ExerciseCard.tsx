import DeleteButton from "@/app/exercises/DeleteButton";
import Link from "next/link";

export default function ExerciseCard({ exercise }: any) {
  return (
    <div>
      <h2>{exercise.name}</h2>
      <p>{exercise.weight}</p>
      <p>{exercise.rep}</p>
      <p>{exercise.date}</p>
      <Link href={`/exercises/${exercise.id}`}>詳細</Link>
      <DeleteButton id={exercise.id} />
      <Link href={`/exercises/${exercise.id}/edit`}>編集</Link>
    </div>
  );
}
