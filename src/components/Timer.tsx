"use client";
import { useEffect, useState } from "react";

interface TimerProps {
  timeLimit: number;
  onTimeUp: () => void;
  questionIndex: number; 
}

export default function Timer({ timeLimit, onTimeUp, questionIndex }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    setTimeLeft(timeLimit); 
  }, [questionIndex, timeLimit]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="text-lg font-bold py-2">
      ⏳ <span className={`px-3 py-1 rounded-md ${timeLeft <= 5 ? "bg-red-500 text-white" : "bg-gray-200"}`}>
        {timeLeft}s
      </span>
    </div>
  );
}
