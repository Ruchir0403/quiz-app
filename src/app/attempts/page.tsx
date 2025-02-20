"use client";
import { useEffect, useState } from "react";
import { getAttempts, clearAttempts } from "@/lib/indexedDB";
import { QuizAttempt } from "@/types/quiz";
import Link from "next/link";

export default function PastAttempts() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    async function fetchAttempts() {
      const data = await getAttempts();
      setAttempts(data.reverse()); // Show latest attempts first
    }
    fetchAttempts();
  }, []);

  const handleClearHistory = async () => {
    const confirmClear = window.confirm("Are you sure you want to delete all quiz history?");
    if (confirmClear) {
      await clearAttempts();
      setAttempts([]); // Clear state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-blue-600">📊 Quiz Attempt History</h1>

        {attempts.length === 0 ? (
          <p className="text-gray-500 mt-4">No past attempts found. Take a quiz to see results here!</p>
        ) : (
          <ul className="mt-4 w-full">
            {attempts.map((attempt, index) => (
              <li key={attempt.id} className="border p-3 mb-2 rounded-md bg-gray-100 text-gray-800">
                <span className="font-semibold">Attempt {attempts.length - index}:</span> Score: {attempt.score} / 10  
                <br />
                <span className="text-sm text-gray-500">{new Date(attempt.date).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Clear History & Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Link href="/">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
              Home 🏠
            </button>
          </Link>

          <button
            onClick={handleClearHistory}
            disabled={attempts.length === 0}
            className={`px-6 py-3 rounded-lg transition ${
              attempts.length === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-700"
            }`}
          >
            Clear History 🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
