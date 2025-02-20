import { openDB } from "idb";
import { QuizAttempt } from "@/types/quiz";

const DB_NAME = "quizDB";
const STORE_NAME = "attempts";

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}

export async function saveAttempt(attempt: QuizAttempt) {
  const db = await getDB();
  await db.put(STORE_NAME, attempt);
}

export async function getAttempts(): Promise<QuizAttempt[]> {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function clearAttempts() {
  const db = await getDB();
  await db.clear(STORE_NAME);
}
