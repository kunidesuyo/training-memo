'use client';

import React, { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="my-4 rounded-md border p-4">
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
        />
      </div>
      <div>カレンダーでクリックしたワークアウトの概要表示</div>
    </div>
  )
}
