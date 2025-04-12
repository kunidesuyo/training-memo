import { prisma } from "@/prisma";
import { UserRepository } from "@/src/repositories/UserRepository";
import { UserService } from "@/src/services/UserService";
import { currentUser as mockedCurrentUser } from "@clerk/nextjs/server";

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
});
