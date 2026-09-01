import { useCallback, useEffect, useMemo, useState } from "react";
import { readStoredCards, removeStorage, writeStorage } from "@/lib/storage";
import type { Flashcard } from "@/types";

export function reconcileStoredCards(
  storedCards: Flashcard[] | null,
  incomingCards: Flashcard[],
): Flashcard[] {
  if (storedCards === null) return incomingCards;

  return storedCards.flatMap((storedCard) => {
    const currentCard = incomingCards.find(
      (card) => card.id === storedCard.id || card.cardNumber === storedCard.cardNumber,
    );
    return currentCard ? [currentCard] : [];
  });
}

export function useStudyDeck(
  incomingCards: Flashcard[],
  storageKey: string,
  onKnown?: (card: Flashcard) => void,
  onNeedsReview?: (card: Flashcard) => void,
) {
  const [cards, setCards] = useState<Flashcard[]>(incomingCards);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const storedCards = readStoredCards(storageKey);
    // The remote deck can replace fallback data after mount, so this session must rehydrate.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCards(reconcileStoredCards(storedCards, incomingCards));
    setCardIndex(0);
    setIsFlipped(false);
  }, [incomingCards, storageKey]);

  const currentCard = cards[cardIndex];

  const goForward = useCallback(() => {
    setCardIndex((currentIndex) =>
      cards.length === 0 || currentIndex >= cards.length - 1 ? 0 : currentIndex + 1,
    );
    setIsFlipped(false);
  }, [cards.length]);

  const goBack = useCallback(() => {
    setCardIndex((currentIndex) =>
      cards.length === 0 || currentIndex <= 0 ? Math.max(cards.length - 1, 0) : currentIndex - 1,
    );
    setIsFlipped(false);
  }, [cards.length]);

  const flipCard = useCallback(() => setIsFlipped((flipped) => !flipped), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;

      if (event.code === "ArrowLeft") goBack();
      if (event.code === "ArrowRight") goForward();
      if (["ArrowUp", "ArrowDown", "Space"].includes(event.code)) {
        event.preventDefault();
        flipCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flipCard, goBack, goForward]);

  const removeCurrentCard = useCallback(
    (callback?: (card: Flashcard) => void) => {
      if (!currentCard) return;
      callback?.(currentCard);

      const nextCards = cards.filter((card) => card.id !== currentCard.id);
      setCards(nextCards);
      writeStorage(storageKey, nextCards);
      setCardIndex((currentIndex) => Math.min(currentIndex, Math.max(nextCards.length - 1, 0)));
      setIsFlipped(false);
    },
    [cards, currentCard, storageKey],
  );

  const markKnown = useCallback(() => removeCurrentCard(onKnown), [onKnown, removeCurrentCard]);
  const markForReview = useCallback(
    () => removeCurrentCard(onNeedsReview),
    [onNeedsReview, removeCurrentCard],
  );

  const reset = useCallback(() => {
    removeStorage(storageKey);
    setCards(incomingCards);
    setCardIndex(0);
    setIsFlipped(false);
  }, [incomingCards, storageKey]);

  const shuffle = useCallback(() => {
    setCards((currentCards) => {
      const shuffledCards = [...currentCards];
      for (let index = shuffledCards.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffledCards[index], shuffledCards[randomIndex]] = [
          shuffledCards[randomIndex],
          shuffledCards[index],
        ];
      }
      writeStorage(storageKey, shuffledCards);
      return shuffledCards;
    });
    setCardIndex(0);
    setIsFlipped(false);
  }, [storageKey]);

  const completedCount = useMemo(
    () => Math.max(incomingCards.length - cards.length, 0),
    [cards.length, incomingCards.length],
  );

  return {
    cardIndex,
    cards,
    completedCount,
    currentCard,
    flipCard,
    goBack,
    goForward,
    isFlipped,
    markForReview,
    markKnown,
    reset,
    shuffle,
  };
}
