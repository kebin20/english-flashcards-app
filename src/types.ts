export type Flashcard = {
  id: string;
  cardNumber: number;
  furigana: string;
  english: string;
  japanese: string;
};

export type FlashcardSet = {
  id: string;
  setNumber: number;
  cards: Flashcard[];
};

export type DeckSource = "local" | "remote" | "fallback";
