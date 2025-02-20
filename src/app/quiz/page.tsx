"use client";
import { useQuizStore } from "@/store/quizStore";
import { questions } from "@/lib/questions";
import Timer from "@/components/Timer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const { currentQuestionIndex, nextQuestion, prevQuestion, selectAnswer, selectedAnswers, isFinished } = useQuizStore();
  const question = questions[currentQuestionIndex];
  const router = useRouter();

  const [selected, setSelected] = useState<string | number | null>(null);
  const [inputAnswer, setInputAnswer] = useState(""); 

  useEffect(() => {
    if (isFinished) {
      router.push("/results");
    }
  }, [isFinished, router]);

  const handleTimeUp = () => {
    if (currentQuestionIndex === questions.length - 1) {
      router.push("/results");
    } else {
      nextQuestion();
      setInputAnswer("");
    }
  };

  const handleAnswer = (answer: string | number) => {
    setSelected(answer);
    selectAnswer(question.id, answer);
  };

  const handleClearSelection = () => {
    setSelected(null);
    setInputAnswer("");
    selectAnswer(question.id, ""); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 text-center">
        <Timer timeLimit={30} onTimeUp={handleTimeUp} questionIndex={currentQuestionIndex} />
        <p className="text-gray-500 text-sm">Question {currentQuestionIndex + 1} of {questions.length}</p>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">{question.question}</h2>

        {question.type === "MCQ" &&
          question.options?.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`w-full py-3 mt-3 text-lg rounded-md transition ${
                selected === option || selectedAnswers[question.id] === option
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 hover:bg-blue-400 hover:text-white"
              }`}
            >
              {option}
            </button>
          ))}

        {question.type === "INTEGER" && (
          <input
            type="number"
            value={inputAnswer}
            placeholder="Enter your answer"
            className="w-full p-3 mt-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setInputAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const value = Number(inputAnswer);
                if (!isNaN(value)) {
                  handleAnswer(value);
                }
              }
            }}
          />
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-lg transition ${
              currentQuestionIndex === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          <button
            onClick={handleClearSelection}
            disabled={!selected && inputAnswer === ""} 
            className={`px-6 py-3 rounded-lg transition ${
              !selected && inputAnswer === ""
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
          >
            Clear Selection
          </button>

          <button
            onClick={() => {
              nextQuestion();
              setSelected(null);
              setInputAnswer("");
            }}
            className="px-6 py-3 rounded-lg bg-green-500 text-white hover:bg-green-700 transition"
          >
            Next (Skip)
          </button>
        </div>
      </div>
    </div>
  );
}
