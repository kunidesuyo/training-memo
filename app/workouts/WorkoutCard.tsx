export default function WorkoutCard({ workout }: any) {
  const date = new Date(workout.date);
  console.log(date);
  const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  return (
    <div>
      <h2>{formattedDate}のワークアウト</h2>
      <p>ID: {workout.id}</p>
      <p>概要</p>
      {workout.exercises.map((exercise: any, index: number) => {
        return (
          <p>{index+1}: {exercise.name}</p>
        );
      })}
    </div>
  );
}
