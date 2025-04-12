import type { UserRepository } from "@/src/repositories/UserRepository";
import type { currentUser } from "@clerk/nextjs/server";

type CurrentUser = typeof currentUser;

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private currentUser: CurrentUser,
  ) {}

  async getCurrentUser() {
    const currentClerkUser = await this.currentUser();
    const clerkId = currentClerkUser?.id;
    if (!clerkId) {
      throw new Error("Clerkユーザーが見つかりません");
    }
    const currentUser = await this.userRepository.findByClerkId(clerkId);
    if (!currentUser) {
      throw new Error("ユーザーが見つかりません");
    }
    return currentUser;
  }
}
