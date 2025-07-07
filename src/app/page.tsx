export default async function Page() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Training Memo
      </h1>
      <p className="text-center text-gray-600">
        想定動作環境: iPhone 12 mini(375x812)
      </p>
      <div className="flex justify-center mt-4">
        <a href="/home" className="text-blue-500 hover:text-blue-600">
          ホームへ
        </a>
      </div>
    </div>
  );
}
