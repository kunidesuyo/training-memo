import Link from "next/link";

// TODO: prismaから生成された型を使うように修正
type Set = {
  rep: number;
  weight: string;
  order: number;
};

type Rest = {
  time: string;
  order: number;
};

type ExerciseItem = (Set & {type: string}) | (Rest & {type: string});

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
          const setItem = item as Set;
          return (
            <div className="mb-4 mt-4" key={setItem.order}>
              <p>{`セット${setCount}: 重さ: ${setItem.weight}`}</p>
              <p>{`回数: ${setItem.rep}`}</p>
              <p>{setItem.order}</p>
            </div>
          );
        } else if (item.type === 'rest') {
          restCount++;
          const restItem = item as Rest;
          return (
            <div className="mb-4 mt-4" key={restItem.order}>
              <p>{`レスト${restCount}: 時間: ${restItem.time}`}</p>
              <p>{restItem.order}</p>
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
