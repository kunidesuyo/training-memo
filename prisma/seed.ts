import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type User = {
  id: number;
  email: string;
  name: string;
};

const createRootUser = async (): Promise<User> => {
  const rootUser = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "root_user",
    },
  });
  return rootUser as User;
};

const createWorkout = async (
  rootUser: User,
  year: number,
  month: number,
  day: number
) => {
  const workout1 = await prisma.workout.create({
    data: {
      year,
      month,
      day,
      authorId: rootUser.id,
    },
  });
  const exercise1_1 = await prisma.exercise.create({
    data: {
      name: "スクワット",
      workoutId: workout1.id,
      order: 1,
      authorId: rootUser.id,
    },
  });
  await prisma.exerciseItem.create({
    data: {
      type: "WORK",
      weight: 60,
      rep: 10,
      order: 1,
      exerciseId: exercise1_1.id,
      authorId: rootUser.id,
    },
  });
  await prisma.exerciseItem.create({
    data: {
      type: "REST",
      time: 120,
      order: 2,
      exerciseId: exercise1_1.id,
      authorId: rootUser.id,
    },
  });
  await prisma.exerciseItem.create({
    data: {
      type: "WORK",
      weight: 80,
      rep: 10,
      order: 3,
      exerciseId: exercise1_1.id,
      authorId: rootUser.id,
    },
  });
  await prisma.exerciseItem.create({
    data: {
      type: "REST",
      time: 120,
      order: 4,
      exerciseId: exercise1_1.id,
      authorId: rootUser.id,
    },
  });
  await prisma.exerciseItem.create({
    data: {
      type: "WORK",
      weight: 100,
      rep: 10,
      order: 5,
      exerciseId: exercise1_1.id,
      authorId: rootUser.id,
    },
  });
};

// const createTodayWorkout = async (rootUser: User) => {
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = now.getMonth() + 1;
//   const day = now.getDate();
//   createWorkout(rootUser, year, month, day);
// };

const createThisMonthWorkout = async (rootUser: User) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const lastDay = new Date(year, month, 0).getDate();
  for (let i = 1; i <= lastDay; i++) {
    createWorkout(rootUser, year, month, i);
  }
};

createRootUser().then(async (rootUser) => {
  createThisMonthWorkout(rootUser);
});

// .then(async () => {
//   await prisma.$disconnect();
// })
// .catch(async (e) => {
//   console.error(e);
//   await prisma.$disconnect();
//   process.exit(1);
// });
