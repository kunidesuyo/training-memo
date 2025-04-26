import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Training Memo
      </h1>
      <div className="flex justify-center mt-4">
        <a href="/home" className="text-blue-500 hover:text-blue-600">
          ホームへ
        </a>
      </div>
    </div>
  );
}
