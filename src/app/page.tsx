import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <div>
      <h1>training memo</h1>
    </div>
  );
}
