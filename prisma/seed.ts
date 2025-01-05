import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const rootUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'root_user',
    },
  });
  const workout1 = await prisma.workout.create({
    data: {
      year: 2024,
      month: 1,
      day: 1,
      authorId: rootUser.id,
    },
  });
  const exercise1_1 = await prisma.exercise.create({
    data: {
      name: 'スクワット',
      workoutId: workout1.id,
      order: 1,
      authorId: rootUser.id,
    }
  });
  const set1_1 = await prisma.exerciseItem.create({
    data: {
      type: 'WORK',
      weight: 60,
      rep: 10,
      order: 1,
      exerciseId: exercise1_1.id,
      authorId: rootUser.id,
    }
  });
  const rest1_1 = await prisma.exerciseItem.create({
    data: {
      type: 'REST',
      time: 120,
      order: 2,
      exerciseId: exercise1_1.id,
      authorId: rootUser.id,
    }
  });
  const set1_2 = await prisma.exerciseItem.create({
    data: {
      type: 'WORK',
      weight: 80,
      rep: 10,
      order: 3,
      exerciseId: exercise1_1.id,
      authorId: rootUser.id,
    }
  });
  const rest1_2 = await prisma.exerciseItem.create({
    data: {
      type: 'REST',
      time: 120,
      order: 4,
      exerciseId: exercise1_1.id,
      authorId: rootUser.id,
    }
  });
  const set1_3 = await prisma.exerciseItem.create({
    data: {
      type: 'WORK',
      weight: 100,
      rep: 10,
      order: 5,
      exerciseId: exercise1_1.id,
      authorId: rootUser.id,
    }
  });
  const workout2 = await prisma.workout.create({
    data: {
      year: 2024,
      month: 2,
      day: 2,
      authorId: rootUser.id,
    },
  });
  const exercise2_1 = await prisma.exercise.create({
    data: {
      name: 'デッドリフト',
      workoutId: workout2.id,
      order: 1,
      authorId: rootUser.id,
    }
  });
  const set2_1 = await prisma.exerciseItem.create({
    data: {
      type: 'WORK',
      weight: 80,
      rep: 10,
      order: 1,
      exerciseId: exercise2_1.id,
      authorId: rootUser.id,
    }
  });
  const rest2_1 = await prisma.exerciseItem.create({
    data: {
      type: 'REST',
      time: 120,
      order: 2,
      exerciseId: exercise2_1.id,
      authorId: rootUser.id,
    }
  });
  const set2_2 = await prisma.exerciseItem.create({
    data: {
      type: 'WORK',
      weight: 100,
      rep: 10,
      order: 3,
      exerciseId: exercise2_1.id,
      authorId: rootUser.id,
    }
  });
  const rest2_2 = await prisma.exerciseItem.create({
    data: {
      type: 'REST',
      time: 120,
      order: 4,
      exerciseId: exercise2_1.id,
      authorId: rootUser.id,
    }
  });
  const set2_3 = await prisma.exerciseItem.create({
    data: {
      type: 'WORK',
      weight: 120,
      rep: 10,
      order: 5,
      exerciseId: exercise2_1.id,
      authorId: rootUser.id,
    }
  });
}

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
