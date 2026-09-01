import { isFlashcardArray, isFlashcardSetArray } from "@/lib/decks";
import type { Flashcard, FlashcardSet } from "@/types";

export const STORAGE_KEYS = {
  customDecks: "englishFlashcards.customDecks.v2",
  reviewQueue: "revisedCardsDeck",
} as const;

function readJson(key: string): unknown | null {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? null : (JSON.parse(value) as unknown);
  } catch {
    return null;
  }
}

export function readStoredCards(key: string): Flashcard[] | null {
  const value = readJson(key);
  return isFlashcardArray(value) ? value : null;
}

export function readStoredDecks(key: string): FlashcardSet[] | null {
  const value = readJson(key);
  return isFlashcardSetArray(value) ? value : null;
}

export function writeStorage(key: string, value: Flashcard[] | FlashcardSet[]): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Browsers may disable storage. The in-memory app remains fully usable.
  }
}

export function removeStorage(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore unavailable storage and continue with the in-memory state.
  }
}
