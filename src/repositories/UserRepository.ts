import type { PrismaClient, User } from "@prisma/client";

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findByClerkId(clerkId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { clerkId } });
  }
}
