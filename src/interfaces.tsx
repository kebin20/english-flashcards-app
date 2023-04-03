export interface FlashcardType {
  id: string;
  setNumber: number;
  cards: {
    id: string;
    cardNumber: number;
    english: string;
    furigana: string;
    japanese: string;
  }[];
}

export interface FlashcardProps {
  isFlipped: boolean;
  onFlip: () => void;
  currentCard: {
    id: string;
    cardNumber: number;
    english: string;
    furigana: string;
    japanese: string;
  };
}
