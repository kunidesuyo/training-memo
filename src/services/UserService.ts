import type { UserRepository } from "@/src/repositories/UserRepository";
import type { currentUser } from "@clerk/nextjs/server";
import type { User } from "@prisma/client";
type CurrentUser = typeof currentUser;

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private currentUser: CurrentUser,
  ) {}

  // このメソッドは他の多くのサービスから呼び出される基盤的処理のため、UserServiceに作るべきではない
  async getCurrentUser(): Promise<User> {
    const currentClerkUser = await this.currentUser();
    if (!currentClerkUser) {
      throw new Error("Clerkユーザーが見つかりません");
    }
    const clerkId = currentClerkUser.id;
    const currentUser = await this.userRepository.findByClerkId(clerkId);
    if (!currentUser) {
      throw new Error("ユーザーが見つかりません");
    }
    return currentUser;
  }
}
