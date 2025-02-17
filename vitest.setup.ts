import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

export let container: StartedPostgreSqlContainer;
export let testPrisma: PrismaClient;

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
    `DATABASE_URL=${databaseUrl} npx prisma migrate dev --skip-generate`
  );

  testPrisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });
}

beforeAll(async () => {
  console.log("Start Global setup");
  await setupTestDBContainer();
  console.log("End Global setup");
});

afterAll(async () => {
  console.log("Start Global teardown");
  await testPrisma.$disconnect();
  await container.stop();
  console.log("End Global teardown");
});
