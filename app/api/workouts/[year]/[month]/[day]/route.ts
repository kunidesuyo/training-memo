import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ year: string, month: string, day: string}> }): Promise<Response> {
  const year = (await params).year;
  const month = (await params).month;
  const day = (await params).day;
  console.log(month);
  // TODO: ログインユーザのIDで取得するようにする
  const currenUserId = 1;
  const workout = await prisma.workout.findUnique({
    where: {
      year_month_day_authorId: {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
        authorId: currenUserId,
      }
    },
    include: {
      exercises: {
        include: {
          sets: {
            select: {
              weight: true,
              rep: true,
              order: true
            }
          },
          rests: {
            select: {
              time: true,
              order: true
            }
          }
        }
      },
    },
  });
  return Response.json(workout);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ year: string, month: string, day: string}> }): Promise<Response> {
  const year = (await params).year;
  const month = (await params).month;
  const day = (await params).day;
  const workout = await request.json();
  // TODO: ログインユーザのIDで取得するようにする
  const currenUserId = 1;
  // 洗い替えを行うため、既存のセットを削除
  await prisma.set.deleteMany({
    where: {
      exercise: {
        workoutToExercise: {
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day),
          authorId: currenUserId,
        }
      }
    }
  });
  // 洗い替えを行うため、既存のレストを削除
  await prisma.rest.deleteMany({
    where: {
      exercise: {
        workoutToExercise: {
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day),
          authorId: currenUserId,
        }
      }
    }
  });
  // 洗い替えを行うため、既存のエクササイズを削除
  await prisma.exercise.deleteMany({
    where: {
      workoutToExercise: {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
        authorId: currenUserId,
      }
    }
  });
  const updatedWorkout = await prisma.workout.update({
    where: {
      year_month_day_authorId: {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
        authorId: currenUserId,
      }
    },
    // 1:Nの更新は洗い替えで行う
    data: {
      exercises: {
        create: workout.exercises.map((exercise: any) => {
          return {
            name: exercise.name,
            sets: {
              create: exercise.sets.map((set: any) => {
                return {
                  weight: set.weight,
                  rep: set.rep,
                  order: set.order
                }
              })
            },
            rests: {
              create: exercise.rests.map((rest: any) => {
                return {
                  time: rest.time,
                  order: rest.order
                }
              })
            },
            author: {
              connect: {
                id: currenUserId
              }
            }
          }
        })
      }
    },
    include: {
      exercises: {
        include: {
          sets: {
            select: {
              weight: true,
              rep: true,
              order: true
            }
          },
          rests: {
            select: {
              time: true,
              order: true
            }
          }
        }
      },
    },
  });
  return Response.json(updatedWorkout);
}
