'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateExercise() {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [rep, setRep] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('/api/exercises', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, weight: Number(weight), rep: Number(rep), date: new Date(date).toISOString() }),
    });
    if (response.ok) {
      router.push('/exercises');
    } else {
      alert('Failed to create exercise.');
    }
  };

  return (
    <div>
      <h1>新規作成</h1>
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
        <button type="submit">登録</button>
      </form>
      <Link href="/exercises">一覧戻る</Link>
    </div>
  );
}
