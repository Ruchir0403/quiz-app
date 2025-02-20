import { Question } from "@/types/quiz";

export const questions: Question[] = [
  // Multiple-Choice Questions
  { id: 1, question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], correctAnswer: "Mercury", type: "MCQ" },
  { id: 2, question: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], correctAnswer: "Queue", type: "MCQ" },
  { id: 3, question: "Which is used for structuring web pages?", options: ["Python", "Java", "HTML", "C++"], correctAnswer: "HTML", type: "MCQ" },
  { id: 4, question: "What is the chemical symbol for Gold?", options: ["Au", "Gd", "Ag", "Pt"], correctAnswer: "Au", type: "MCQ" },
  { id: 5, question: "Which process is NOT used in petroleum refining?", options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"], correctAnswer: "Filtration", type: "MCQ" },

  // Integer-Type Questions
  { id: 6, question: "What is the value of 12 + 28?", correctAnswer: 40, type: "INTEGER" },
  { id: 7, question: "How many states are there in the US?", correctAnswer: 50, type: "INTEGER" },
  { id: 8, question: "In which year was the Declaration of Independence signed?", correctAnswer: 1776, type: "INTEGER" },
  { id: 9, question: "What is the value of pi rounded to the nearest integer?", correctAnswer: 3, type: "INTEGER" },
  { id: 10, question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?", correctAnswer: 120, type: "INTEGER" },
];
