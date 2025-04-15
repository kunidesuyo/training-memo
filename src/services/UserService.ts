import type { ClerkRepository } from "@/src/repositories/ClerkRepository";
import type { UserRepository } from "@/src/repositories/UserRepository";
import type { User } from "@prisma/client";
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private clerkRepository: ClerkRepository,
  ) {}

  // このメソッドは他の多くのサービスから呼び出される基盤的処理のため、UserServiceに作るべきではない
  async getCurrentUser(): Promise<User> {
    const currentClerkUser = await this.clerkRepository.getCurrentUser();
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
