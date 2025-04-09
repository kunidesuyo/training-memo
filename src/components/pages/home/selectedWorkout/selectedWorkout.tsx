import CreateWorkoutButton from "@/src/components/pages/home/createWorkoutButton/createWorkoutButton";
import type { Exercise, Workout } from "@/src/services/WorkoutService";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const formatDate = (selectedDate: Date) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();
  return { year, month, day };
};

const renderSelectedDate = (selectedDate: Date) => {
  const { year, month, day } = formatDate(selectedDate);
  return (
    <div>
      <p className="text-xl font-semibold text-gray-800">
        {year}年{month}月{day}日
      </p>
    </div>
  );
};

const renderWorkoutDetails = (
  selectedWorkout: Workout,
  year: number,
  month: number,
  day: number,
) => {
  return (
    <div>
      {selectedWorkout.exercises?.map((exercise: Exercise, index: number) => (
        <div
          key={exercise.id}
          className="mb-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors my-2"
        >
          <p className="text-gray-700 font-medium">
            エクササイズ{index + 1}:{" "}
            <span className="text-gray-900">{exercise.name}</span>
          </p>
        </div>
      ))}
      <Link
        href={`/workouts/${year}/${month}/${day}/`}
        className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600"
      >
        <ChevronRight className="w-5 h-5" aria-label="詳細を見る" />
        詳細
      </Link>
    </div>
  );
};

export default async function SelectedWorkout({
  selectedDate,
  selectedWorkout,
}: {
  selectedDate: Date;
  selectedWorkout: Workout | undefined;
}) {
  const { year, month, day } = formatDate(selectedDate);
  // 表示するworkoutはpropsで受け取るように変更
  // const selectedWorkout: Workout | null = await getWorkout(year, month, day);

  return (
    <div className="my-2 rounded-md border p-4 mx-2 max-w-[85%] w-full">
      {selectedDate ? (
        renderSelectedDate(selectedDate)
      ) : (
        <p>日付を選択してください。</p>
      )}
      {selectedWorkout ? (
        renderWorkoutDetails(selectedWorkout, year, month, day)
      ) : (
        <div>
          <CreateWorkoutButton selectedDate={selectedDate} />
        </div>
      )}
    </div>
  );
}
