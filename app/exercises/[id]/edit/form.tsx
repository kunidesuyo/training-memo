'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Form({ exercise }: { exercise: { id: string, name: string; weight: number; rep: number; date: string } }) {
  const id = exercise.id;
  const [name, setName] = useState(exercise.name);
  const [weight, setWeight] = useState(exercise.weight.toString());
  const [rep, setRep] = useState(exercise.rep.toString());
  const [date, setDate] = useState(new Date(exercise.date).toISOString().slice(0, 16));
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(`/api/exercises/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, weight: Number(weight), rep: Number(rep), date: new Date(date).toISOString() }),
    });
    if (response.ok) {
      router.push('/exercises');
    } else {
      alert('Failed to update exercise.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>重量:</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        </div>
        <div>
          <label>回数:</label>
          <input type="number" value={rep} onChange={(e) => setRep(e.target.value)} required />
        </div>
        <div>
          <label>日付:</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <button type="submit">更新</button>
      </form>
    </div>
  );
}
