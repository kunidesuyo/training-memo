export default async function exercises() {
  const exercises = await fetch('http://localhost:3000/api/exercises').then((res) => res.json());
  return (
    <div>
      {exercises.map((exercise: any) => {
        return (
          <div>
            <h2>{exercise.name}</h2>
            <p>{exercise.weight}</p>
            <p>{exercise.rep}</p>
            <p>{exercise.date}</p>
          </div>
        );
      })}
    </div>
  );
}
