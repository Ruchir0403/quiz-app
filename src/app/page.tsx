"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-4">🎉 Welcome to CodeQuiz!</h1>
      <p className="text-lg mb-6 text-center">Test your knowledge and track your progress.</p>

      <div className="flex gap-4">
        <Link href="/quiz">
          <button className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition">
            Start Quiz 🚀
          </button>
        </Link>

        <Link href="/attempts">
          <button className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-300 transition">
            Past Attempts 📊
          </button>
        </Link>
      </div>
    </div>
  );
}
