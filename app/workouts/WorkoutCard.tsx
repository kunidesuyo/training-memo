type Workout = {
  id: number;
  year: number;
  month: number;
  day: number;
  exercises: Exercise[];
}

type Exercise = {
  id: number;
  name: string;
}

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const date = `${workout.year}年${workout.month + 1}月${workout.day}日`;
  return (
    <div>
      <h2>{date}のワークアウト</h2>
      <p>ID: {workout.id}</p>
      <p>概要</p>
      {workout.exercises.map((exercise: Exercise, index: number) => {
        return (
          <p key={index}>{index+1}: {exercise.name}</p>
        );
      })}
    </div>
  );
}
