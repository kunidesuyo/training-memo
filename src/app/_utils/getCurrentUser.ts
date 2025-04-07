import { prisma } from "@/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getCurrentUser(): Promise<{ id: number }> {
  const currentClerkUser = await currentUser();
  const user = await prisma.user.findUnique({
    where: {
      clerkId: currentClerkUser?.id,
    },
    select: {
      id: true,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return { id: user.id };
}
