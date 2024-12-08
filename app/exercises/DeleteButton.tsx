'use client';

import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch(`/api/exercises/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      router.refresh(); // ページをリフレッシュして最新のデータを取得
    } else {
      alert('Failed to delete exercise.');
    }
  };

  return (
    <button onClick={handleDelete}>削除</button>
  );
}
