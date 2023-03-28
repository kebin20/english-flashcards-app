export interface FlashcardType {
  id: string;
  setNumber: number;
  card: {
    id: string;
    cardNumber: number;
    english: string;
    furigana: string;
    japanese: string;
  }[];
}

export interface FlashcardProps {
  isFlipped: boolean;
  currentCard: {
    id: string;
    cardNumber: number;
    english: string;
    furigana: string;
    japanese: string;
  };
}

