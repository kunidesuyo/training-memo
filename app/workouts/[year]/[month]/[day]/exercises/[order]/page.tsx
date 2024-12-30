import Link from "next/link";

export default async function exercise({ params }: { params: { year: string, month: string, day: string, order: string } }) {
  const {year, month, day, order} = await params;
  const exercise = await fetch(`http://localhost:3000/api/workouts/${year}/${month}/${day}/exercises/${order}`).then((res) => res.json());
  console.log(exercise);
  return (
    <div>
      <h2>{exercise.name}</h2>
      {exercise.sets.map((set) => (
        <div className="mb-4 mt-4">
          <p>{`重さ: ${set.weight}`}</p>
          <p>{`回数: ${set.rep}`}</p>
          <p>{set.order}</p>
        </div>
      ))}
      {exercise.rests.map((rest) => (
        <div className="mb-4 mt-4">
          <p>{`時間: ${rest.time}`}</p>
          <p>{rest.order}</p>
        </div>
      ))}
      <Link 
        className="text-blue-500 underline"
        href={`/workouts/${year}/${month}/${day}`}>戻る</Link>
    </div>
  );
}
