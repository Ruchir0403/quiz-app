import { create } from "zustand";
import { Question } from "@/types/quiz";
import { questions } from "@/lib/questions";
import { saveAttempt } from "@/lib/indexedDB";

type QuizState = {
  currentQuestionIndex: number;
  selectedAnswers: Record<number, string | number>;
  score: number;
  isFinished: boolean;
  nextQuestion: () => void;
  prevQuestion: () => void;
  selectAnswer: (id: number, answer: string | number) => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  currentQuestionIndex: 0,
  selectedAnswers: {},
  score: 0,
  isFinished: false,

  nextQuestion: () =>
    set((state) => {
      const nextIndex = state.currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        return { currentQuestionIndex: nextIndex };
      } else {
        const attempt = {
          id: Date.now().toString(),
          score: state.score,
          date: new Date().toISOString(),
        };
        saveAttempt(attempt);
        return { isFinished: true };
      }
    }),

  prevQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
    })),

  selectAnswer: (id, answer) =>
    set((state) => {
      const correct = questions.find((q) => q.id === id)?.correctAnswer;
      const newScore = correct === answer ? state.score + 1 : state.score;
      return { selectedAnswers: { ...state.selectedAnswers, [id]: answer }, score: newScore };
    }),

  resetQuiz: () => set({ currentQuestionIndex: 0, selectedAnswers: {}, score: 0, isFinished: false }),
}));
