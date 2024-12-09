import DeleteButton from "@/app/exercises/DeleteButton";
import Link from "next/link";

export default async function exercises() {
  const exercises = await fetch('http://localhost:3000/api/exercises').then((res) => res.json());
  return (
    <div>
      <Link href="/exercises/create">新規作成</Link>
      {exercises.map((exercise: any) => {
        return (
          <div key={exercise.id}>
            <h2>{exercise.name}</h2>
            <p>{exercise.weight}</p>
            <p>{exercise.rep}</p>
            <p>{exercise.date}</p>
            <Link href={`/exercises/${exercise.id}`}>詳細</Link>
            <DeleteButton id={exercise.id} />
            <Link href={`/exercises/${exercise.id}/edit`}>編集</Link>
          </div>
        );
      })}
    </div>
  );
}
