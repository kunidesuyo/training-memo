import type { User, currentUser } from "@clerk/nextjs/server";

type CurrentUser = typeof currentUser;

export class ClerkRepository {
  constructor(private currentUser: CurrentUser) {}

  async getCurrentUser(): Promise<User | null> {
    const user = await this.currentUser();
    return user;
  }
}
