import Link from "next/link";

// TODO: prismaから生成された型を使うように修正
interface Set {
  rep: number;
  weight: string;
  order: number;
}

interface Rest {
  time: string;
  order: number;
}

interface ExerciseItem extends Set, Rest {
  type: 'set' | 'rest';
}

export default async function exercise({ params }: { params: { year: string, month: string, day: string, order: string } }) {
  const {year, month, day, order} = await params;
  const exercise = await fetch(`http://localhost:3000/api/workouts/${year}/${month}/${day}/exercises/${order}`).then((res) => res.json());
  const sets: Set[] = exercise.sets;
  const rests: Rest[] = exercise.rests;
  const exerciseItems: ExerciseItem[] = [
    ...sets.map((set) => ({ ...set, type: 'set' })),
    ...rests.map((rest) => ({ ...rest, type: 'rest' })),
  ];
  const sortedExerciseItems: ExerciseItem[] = exerciseItems.sort((a, b) => a.order - b.order);

  let setCount = 0;
  let restCount = 0;

  return (
    <div>
      <h2>{exercise.name}</h2>
      {sortedExerciseItems.map((item) => {
        if (item.type === 'set') {
          setCount++;
          return (
            <div className="mb-4 mt-4" key={item.order}>
              <p>{`セット${setCount}: 重さ: ${item.weight}`}</p>
              <p>{`回数: ${item.rep}`}</p>
              <p>{item.order}</p>
            </div>
          );
        } else if (item.type === 'rest') {
          restCount++;
          return (
            <div className="mb-4 mt-4" key={item.order}>
              <p>{`レスト${restCount}: 時間: ${item.time}`}</p>
              <p>{item.order}</p>
            </div>
          );
        } else {
          return null;
        }
      })}
      <Link 
        className="text-blue-500 underline"
        href={`/workouts/${year}/${month}/${day}`}>戻る</Link>
    </div>
  );
}
