export type Question = {
    id: number;
    question: string;
    options?: string[];
    correctAnswer: string | number;
    type: "MCQ" | "INTEGER";
  };
  
  export type QuizAttempt = {
    id: string;
    score: number;
    date: string;
  };
  