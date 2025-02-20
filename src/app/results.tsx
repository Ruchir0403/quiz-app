"use client";
import { useEffect, useState } from "react";
import { getAttempts } from "@/lib/indexedDB";
import { QuizAttempt } from "@/types/quiz";
import Link from "next/link"; // ✅ Import Link

export default function Results() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    async function fetchAttempts() {
      const data = await getAttempts();
      setAttempts(data);
    }
    fetchAttempts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-blue-600">📊 Past Quiz Attempts</h1>

        {attempts.length === 0 ? (
          <p className="text-gray-500 mt-4">No attempts yet. Take the quiz!</p>
        ) : (
          <ul className="mt-4 w-full">
            {attempts.map((attempt) => (
              <li key={attempt.id} className="border p-3 mb-2 rounded-md bg-gray-100">
                <span className="font-semibold">Score:</span> {attempt.score} / 10  
                <br />
                <span className="text-sm text-gray-500">{new Date(attempt.date).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}

        {/* ✅ Use Link instead of <a> */}
        <Link href="/" className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
          Try Again 🔄
        </Link>
      </div>
    </div>
  );
}
