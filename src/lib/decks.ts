import fallbackDecks from "@/flashcard-data";
import type { Flashcard, FlashcardSet } from "@/types";

export const REMOTE_DECKS_URL =
  "https://english-flashcards-app-962bb-default-rtdb.asia-southeast1.firebasedatabase.app/flashcards.json";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export function isFlashcard(value: unknown): value is Flashcard {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.cardNumber === "number" &&
    typeof value.furigana === "string" &&
    typeof value.english === "string" &&
    typeof value.japanese === "string"
  );
}

export function isFlashcardArray(value: unknown): value is Flashcard[] {
  return Array.isArray(value) && value.every(isFlashcard);
}

export function isFlashcardSet(value: unknown): value is FlashcardSet {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.setNumber === "number" &&
    isFlashcardArray(value.cards)
  );
}

export function isFlashcardSetArray(value: unknown): value is FlashcardSet[] {
  return Array.isArray(value) && value.length > 0 && value.every(isFlashcardSet);
}

export function normaliseDecks(decks: FlashcardSet[]): FlashcardSet[] {
  return decks.map((deck) => ({
    ...deck,
    cards: deck.cards.map((card) => ({
      ...card,
      english: card.english.trim(),
      furigana: card.furigana.trim(),
      japanese: card.japanese.trim(),
    })),
  }));
}

export async function fetchRemoteDecks(signal?: AbortSignal): Promise<FlashcardSet[]> {
  const response = await fetch(REMOTE_DECKS_URL, { signal });

  if (!response.ok) {
    throw new Error(`Flashcard request failed with status ${response.status}.`);
  }

  const payload: unknown = await response.json();
  if (!isRecord(payload) || !isFlashcardSetArray(payload.decks)) {
    throw new Error("The flashcard service returned an unexpected response.");
  }

  return normaliseDecks(payload.decks);
}

export const safeFallbackDecks = normaliseDecks(fallbackDecks);
