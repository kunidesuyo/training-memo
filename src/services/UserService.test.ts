import { prisma } from "@/prisma";
import { UserRepository } from "@/src/repositories/UserRepository";
import { UserService } from "@/src/services/UserService";
import { currentUser as mockedCurrentUser } from "@clerk/nextjs/server";
import * as _clerk from "@clerk/nextjs/server";
import { faker } from "@faker-js/faker";
describe("getCurrentUser test", () => {
  it("ログイン中のユーザーが取得できること", async () => {
    // Arrange
    // setupで対象ユーザー作成済み

    // Act
    const userRepository = new UserRepository(prisma);
    const userService = new UserService(userRepository, mockedCurrentUser);
    const currentUser = await userService.getCurrentUser();

    // Assert
    expect(currentUser).not.toBeNull();
  });

  it("ログインしていない場合はエラーを投げること", async () => {
    // Arrange
    vi.spyOn(_clerk, "currentUser").mockImplementation(async () => {
      return null;
    });

    // Act&Assert
    const userRepository = new UserRepository(prisma);
    const userService = new UserService(userRepository, mockedCurrentUser);
    await expect(userService.getCurrentUser()).rejects.toThrow(
      "Clerkユーザーが見つかりません",
    );
  });

  it("Clerkユーザーに紐づくユーザーが存在しない場合はエラーを投げること", async () => {
    // Arrange
    const mockedClerkId = `mocked-clerk-id-${faker.string.uuid()}`;
    vi.spyOn(_clerk, "currentUser").mockImplementation(async () => {
      return { id: mockedClerkId } as _clerk.User;
    });

    // Act&Assert
    const userRepository = new UserRepository(prisma);
    const userService = new UserService(userRepository, mockedCurrentUser);
    await expect(userService.getCurrentUser()).rejects.toThrow(
      "ユーザーが見つかりません",
    );
  });
});
