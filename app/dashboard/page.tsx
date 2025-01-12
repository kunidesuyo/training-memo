'use client';

import React, { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"


export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <div>
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        className='rounded-md border'
      />
      <div>カレンダーでクリックしたワークアウトの概要表示</div>
    </div>
  )
}
