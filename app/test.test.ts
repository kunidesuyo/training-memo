import { testPrisma } from "@/vitest.setup";

// 簡単なテスト
describe("test", () => {
  it("test", async () => {
    console.log("test start");
    expect(1 + 1).toBe(2);

    const user = await testPrisma.user.create({
      data: {
        email: "test@example.com",
      },
    });

    expect(user.id).toBe(1);

  });
});
