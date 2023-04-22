import React, { useState, useEffect, ReactNode } from "react";

import { CardContentType } from "../interfaces";

type FlashcardContextObj = {
  flashcards: CardContentType[];
  isFlipped: boolean;
  goForward: () => void;
  goBack: () => void;
  handleKeyDown: (event: { code: string }) => void;
  vocabLearnt: () => void;
  reviseVocab: () => void;
  reset: () => void;
  flipCard: () => void;
};

export const FlashcardContext = React.createContext<FlashcardContextObj>({
  flashcards: [],
  isFlipped: false,
  goForward: () => {},
  goBack: () => {},
  handleKeyDown: (event: { code: string }) => {},
  vocabLearnt: () => {},
  reviseVocab: () => {},
  reset: () => {},
  flipCard: () => {},
});

function FlashcardContextProvider({
  children,
  vocab,
  cards,
  onPassVocabDataUp,
  storageItem,
}: {
  cards: CardContentType[];
  onPassVocabDataUp: (
    newVocabData: React.SetStateAction<CardContentType[]>
  ) => void;
  vocab: CardContentType[];
  children: ReactNode;
  storageItem: string;
}) {
  const [cardDeck, setCardDeck] = useState(cards);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [vocabToLearn, setVocabToLearn] = useState(vocab);

  // Get the current state of the flashcards and display it on screen
  useEffect(() => {
    const storedCardDeck = JSON.parse(
      localStorage.getItem(storageItem) || "[]"
    );
    if (storedCardDeck.length > 0) {
      setCardDeck(storedCardDeck);
    }
  }, [cards]);

  //Vocab navigation

  function goForward() {
    setCardIndex((prevIndex) =>
      prevIndex >= cardDeck.length - 1 ? 0 : prevIndex + 1
    );
  }

  function goBack() {
    setCardIndex((prevIndex) =>
      prevIndex <= 0 ? cardDeck.length - 1 : prevIndex - 1
    );
  }

  //Vocab navigation with arrow keys
  function handleKeyDown(event: { code: string }) {
    if (event.code === "ArrowLeft") {
      // Handle left arrow key press
      goBack();
    } else if (event.code === "ArrowRight") {
      // Handle right arrow key press
      goForward();
    } else if (event.code === "ArrowUp" || event.code === "ArrowDown") {
      flipCard();
    } else if (event.code === "Space") {
      // Handle space key press
      flipCard();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [cardDeck, goForward, goBack, flipCard]);

  // Main button functions

  function vocabLearnt() {
    //The current position of the card at this time
    const cardToRemove = cardDeck[cardIndex];
    setCardDeck((prevCardDeck) =>
      prevCardDeck.filter((card) => card.id !== cardToRemove.id)
    );
    // To store current state of deck
    localStorage.setItem(
      storageItem,
      JSON.stringify(cardDeck.filter((card) => card.id !== cardToRemove.id))
    );
  }

  function reviseVocab() {
    const cardToRemove = cardDeck[cardIndex];
    const newDeck: CardContentType[] = cardDeck.filter(
      (card) => card.id !== cardToRemove.id
    );
    // To store current state of deck
    localStorage.setItem(
      storageItem,
      JSON.stringify(cardDeck.filter((card) => card.id !== cardToRemove.id))
    );

    //To make sure same cards are not being added
    const vocabToLearnArr = vocabToLearn.find(
      (card) => card.id === cardToRemove.id
    )
      ? [...vocabToLearn]
      : [...vocabToLearn, cardToRemove];
    setCardDeck(newDeck);
    setVocabToLearn(vocabToLearnArr);
  }

  useEffect(() => {
    onPassVocabDataUp(vocabToLearn);
  }, [vocabToLearn]);

  function reset() {
    localStorage.removeItem(storageItem);
    setCardDeck(cards);
    setCardIndex(0);
    setIsFlipped(false);
    setVocabToLearn([]);
  }

  function flipCard() {
    setIsFlipped((prevFlip) => !prevFlip);
  }

  const contextValue: FlashcardContextObj = {
    flashcards: cardDeck,
    isFlipped: isFlipped,
    goForward: goForward,
    goBack: goBack,
    handleKeyDown: handleKeyDown,
    vocabLearnt: vocabLearnt,
    reviseVocab: reviseVocab,
    reset: reset,
    flipCard: flipCard,
  };

  return (
    <FlashcardContext.Provider value={contextValue}>
      {children}
    </FlashcardContext.Provider>
  );
}

export default FlashcardContextProvider;
