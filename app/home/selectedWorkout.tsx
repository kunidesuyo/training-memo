"use client";

import React from "react";

export default function SelectedWorkout({
  selectedDate,
}: {
  selectedDate: Date | undefined;
}) {
  return (
    <div>
      {selectedDate ? (
        <div>
          <p>選択された日付</p>
          <p>{selectedDate.getFullYear()}年</p>
          <p>{selectedDate.getMonth() + 1}月</p>
          <p>{selectedDate.getDate()}日</p>
          {/* ここに選択された日付に基づくワークアウトの概要を表示 */}
        </div>
      ) : (
        <p>日付が選択されていません。</p>
      )}
    </div>
  );
}
