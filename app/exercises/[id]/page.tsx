import Link from 'next/link';

export default async function exercise({ params }: { params: { id: string } }) {
  const id = await (params).id;
  const exercise = await fetch(`http://localhost:3000/api/exercises/${id}`).then((res) => res.json());
  return (
    <div>
      <div>
        <h2>{exercise.name}</h2>
        <p>{exercise.weight}</p>
        <p>{exercise.rep}</p>
        <p>{exercise.date}</p>
      </div>
      <Link href="/exercises">一覧に戻る</Link>
    </div>
  );
}
