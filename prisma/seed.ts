import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  // const rootUser = await prisma.user.create({
  //   data: {
  //     email: 'test@example.com',
  //     name: 'root_user',
  //   },
  // });
  // console.log(rootUser);
  // const excercise1 = await prisma.exercise.create({
  //   data: {
  //     name: 'Squat',
  //     weight: 90,
  //     rep: 5,
  //     date: new Date(),
  //     createdBy: rootUser.id,
  //     updatedBy: rootUser.id,
  //   },
  // });
  // console.log(excercise1);
  // const excercise2 = await prisma.exercise.create({
  //   data: {
  //     name: 'Deadlift',
  //     weight: 100,
  //     rep: 5,
  //     date: new Date(),
  //     createdBy: rootUser.id,
  //     updatedBy: rootUser.id,
  //   },
  // });
  // console.log(excercise2);
  // const excercise3 = await prisma.exercise.create({
  //   data: {
  //     name: 'Bench Press',
  //     weight: 60,
  //     rep: 5,
  //     date: new Date(),
  //     createdBy: rootUser.id,
  //     updatedBy: rootUser.id,
  //   },
  // });
  // console.log(excercise3);
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
