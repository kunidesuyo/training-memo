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
      date: new Date(),
      authorId: rootUser.id,
    },
  });
  const exercise1 = await prisma.exercise.create({
    data: {
      name: 'スクワット',
      workoutId: workout1.id,
      authorId: rootUser.id,
    }
  });
  const set1 = await prisma.set.create({
    data: {
      weight: '60',
      rep: 10,
      order: 1,
      exerciseId: exercise1.id,
    }
  });
  const rest1 = await prisma.rest.create({
    data: {
      time: 120,
      order: 2,
      exerciseId: exercise1.id,
    }
  });
  const set2 = await prisma.set.create({
    data: {
      weight: '80',
      rep: 10,
      order: 3,
      exerciseId: exercise1.id,
    }
  });
  const rest2 = await prisma.rest.create({
    data: {
      time: 120,
      order: 4,
      exerciseId: exercise1.id,
    }
  });
  const set3 = await prisma.set.create({
    data: {
      weight: '100',
      rep: 10,
      order: 5,
      exerciseId: exercise1.id,
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
