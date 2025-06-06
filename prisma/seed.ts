import { faker } from "@faker-js/faker/locale/ja";
import {
  type Exercise,
  PrismaClient,
  type User,
  type Workout,
} from "@prisma/client";
const prisma = new PrismaClient();

const createRootUser = async (): Promise<User> => {
  const rootUser = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "root_user",
      clerkId: "clerk_id_tmp",
    },
  });
  return rootUser as User;
};

const createWorkout = async (
  rootUser: User,
  year: number,
  month: number,
  day: number,
) => {
  const workout = await prisma.workout.create({
    data: {
      year,
      month,
      day,
      authorId: rootUser.id,
    },
  });

  createExercise(workout, rootUser, 1);
  createExercise(workout, rootUser, 2);
  createExercise(workout, rootUser, 3);
};

const createExercise = async (
  workout: Workout,
  rootUser: User,
  order: number,
) => {
  const exercise = await prisma.exercise.create({
    data: {
      name: faker.lorem.word(),
      workoutId: workout.id,
      order,
      authorId: rootUser.id,
    },
  });
  createExerciseItems(exercise, rootUser);
};

const createExerciseItems = async (exercise: Exercise, rootUser: User) => {
  const itemTypes = ["WORK", "REST", "WORK", "REST", "WORK"];
  itemTypes.forEach(async (type, index) => {
    if (type === "WORK") {
      await prisma.workExerciseItem.create({
        data: {
          weight: faker.number.int({ min: 20, max: 100 }),
          rep: 10,
          order: index + 1,
          exerciseId: exercise.id,
          authorId: rootUser.id,
        },
      });
    } else {
      await prisma.restExerciseItem.create({
        data: {
          time: 120,
          order: index + 1,
          exerciseId: exercise.id,
          authorId: rootUser.id,
        },
      });
    }
  });
};

const createWorkoutsThisMonth = async (rootUser: User) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  for (let i = 10; i <= 15; i++) {
    createWorkout(rootUser, year, month, i);
  }
};

const main = async () => {
  const rootUser = await createRootUser();
  createWorkoutsThisMonth(rootUser);
};

main();
