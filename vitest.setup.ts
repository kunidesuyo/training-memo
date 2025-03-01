import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import * as _prisma from "@/prisma";
import * as _getCurrentUser from "@/app/_utils/getCurrentUser";

let container: StartedPostgreSqlContainer;
let prisma: PrismaClient;

export async function setupTestDBContainer() {
  container = await new PostgreSqlContainer("postgres:latest").start();

  const connectionConfig = {
    host: container.getHost(),
    port: container.getMappedPort(5432),
    database: container.getDatabase(),
    user: container.getUsername(),
    password: container.getPassword(),
  };

  const databaseUrl = `postgresql://${connectionConfig.user}:${connectionConfig.password}@${connectionConfig.host}:${connectionConfig.port}/${connectionConfig.database}`;

  execSync(
    `DATABASE_URL=${databaseUrl} npx prisma migrate dev --skip-generate`,
  );

  prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });
}

beforeAll(async () => {
  console.log("Start Global setup");

  console.log("Setup Test DB Container");
  await setupTestDBContainer();

  console.log("Setup Prisma Client Mock");
  vi.spyOn(_prisma, "prisma", "get").mockImplementation(() => {
    return prisma;
  });

  console.log("Create Current User");
  const currentUser = await prisma.user.create({
    data: {
      email: "test@example.com",
    },
  });
  console.log("Setup Get Current User Mock");
  vi.spyOn(_getCurrentUser, "getCurrentUser").mockImplementation(() => {
    return { id: currentUser.id };
  });

  console.log("End Global setup");
});

afterEach(async () => {
  console.log("datebase cleanup");
  await prisma.exerciseItem.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.workout.deleteMany();
  console.log("End database cleanup");
});

afterAll(async () => {
  console.log("Start Global teardown");
  await prisma.$disconnect();
  await container.stop();
  console.log("End Global teardown");
});
