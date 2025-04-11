import { prisma } from "@/prisma";
import { UserRepository } from "@/src/repositories/UserRepository";

describe("findByClerkId test", () => {
  it("clerkIdに紐づくユーザーが存在する場合、ユーザーを返すこと", async () => {
    // Arrange
    const userRepository = new UserRepository(prisma);
    const clerkId = "clerkId";
    await prisma.user.create({
      data: {
        clerkId,
        email: "test@example.com",
      },
    });

    // Act
    const user = await userRepository.findByClerkId("clerkId");

    // Assert
    expect(user).not.toBeNull();
  });
});
