import Form from '@/app/exercises/[id]/edit/form';

export default async function EditExercise(props: { params: Promise<{ id: string }> }) {
  const params = await (props.params);
  const id = params.id;
  const response = await fetch(`http://localhost:3000/api/exercises/${id}`);
  const exercise: { id: string, name: string; weight: number; rep: number; date: string } = await response.json();

  return (
    <div>
      <h1>エクササイズの編集</h1>
      <Form exercise={exercise}/>
    </div>
  );
}