import { useCallback, useState } from "react";
import { readStoredCards, STORAGE_KEYS, writeStorage } from "@/lib/storage";
import type { Flashcard } from "@/types";

export function useReviewQueue() {
  const [reviewCards, setReviewCards] = useState<Flashcard[]>(
    () => readStoredCards(STORAGE_KEYS.reviewQueue) ?? [],
  );

  const addReviewCard = useCallback((card: Flashcard) => {
    setReviewCards((currentCards) => {
      const nextCards = currentCards.some(
        (currentCard) => currentCard.id === card.id || currentCard.cardNumber === card.cardNumber,
      )
        ? currentCards
        : [...currentCards, card];
      writeStorage(STORAGE_KEYS.reviewQueue, nextCards);
      return nextCards;
    });
  }, []);

  const removeReviewCard = useCallback((card: Flashcard) => {
    setReviewCards((currentCards) => {
      const nextCards = currentCards.filter(
        (currentCard) =>
          currentCard.id !== card.id && currentCard.cardNumber !== card.cardNumber,
      );
      writeStorage(STORAGE_KEYS.reviewQueue, nextCards);
      return nextCards;
    });
  }, []);

  return { addReviewCard, removeReviewCard, reviewCards };
}
