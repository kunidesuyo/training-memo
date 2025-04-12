import { execSync } from "node:child_process";
import * as _prisma from "@/prisma";
import * as _getCurrentUser from "@/src/app/_utils/getCurrentUser";
import * as _clerk from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import {
  PostgreSqlContainer,
  type StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

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

  console.log("Setup Clerk Client Mock");
  const mockedClerkId = "mocked-clerk-id";
  vi.spyOn(_clerk, "currentUser").mockImplementation(async () => {
    return { id: mockedClerkId } as _clerk.User;
  });

  console.log("Create Current User");
  const currentUser = await prisma.user.create({
    data: {
      email: "test@example.com",
      clerkId: mockedClerkId,
    },
  });
  console.log("Setup Get Current User Mock");
  vi.spyOn(_getCurrentUser, "getCurrentUser").mockImplementation(async () => {
    return { id: currentUser.id };
  });

  console.log("End Global setup");
});

afterEach(async () => {
  console.log("datebase cleanup");
  await prisma.workExerciseItem.deleteMany();
  await prisma.restExerciseItem.deleteMany();
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
