import React, { ReactNode, useEffect, useState } from "react";

import { CardContentType, FlashcardSetData } from "../interfaces";

type FlashcardContextObj = {
  incomingDeck: CardContentType[];
  vocabToLearn: CardContentType[];
  cardIndex: number;
  length: number;
  cardDeck: CardContentType[];
  isFlipped: boolean;
  goForward: () => void;
  goBack: () => void;
  getCurrentState: (storageItem: string) => void;
  vocabLearnt: (storageItem: string) => void;
  reviseVocab: (storageItem: string) => void;
  reset: (storageItem: string) => void;
  flipCard: () => void;
};

export const FlashcardContext = React.createContext<FlashcardContextObj>({
  incomingDeck: [],
  vocabToLearn: [],
  length: 0,
  cardDeck: [],
  cardIndex: 0,
  isFlipped: false,
  goForward: () => {},
  goBack: () => {},
  getCurrentState: () => {},
  vocabLearnt: () => {},
  reviseVocab: () => {},
  reset: () => {},
  flipCard: () => {},
});

function FlashcardContextProvider({
  incomingDeck,
  vocabData,
  children,
}: {
  vocabData: CardContentType[];
  incomingDeck: CardContentType[];
  children: ReactNode;
}) {
  const [cardDeck, setCardDeck] = useState(incomingDeck);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [vocabToLearn, setVocabToLearn] =
    useState<CardContentType[]>(vocabData);

  // Get the current state of the flashcards and display it on screen
  function getCurrentState(storageItem: string) {
    const storedCardDeck = JSON.parse(
      localStorage.getItem(storageItem) || "[]"
    );
    if (storedCardDeck.length > 0) {
      setCardDeck(storedCardDeck);
    }
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
  }, [incomingDeck, goForward, goBack, flipCard]);

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

  // Main button functions

  function vocabLearnt(storageItem: string) {
    //The current position of the card at this time
    const cardToRemove = cardDeck[cardIndex];
    setCardDeck((prevCardDeck: any[]) =>
      prevCardDeck.filter((card) => card.id !== cardToRemove.id)
    );
    // To store current state of deck
    localStorage.setItem(
      storageItem,
      JSON.stringify(
        cardDeck.filter((card: { id: string }) => card.id !== cardToRemove.id)
      )
    );
  }

  function reviseVocab(storageItem: string) {
    const cardToRemove = cardDeck[cardIndex];
    const newDeck = cardDeck.filter(
      (card: { id: string }) => card.id !== cardToRemove.id
    );
    // To store current state of deck
    localStorage.setItem(
      storageItem,
      JSON.stringify(
        cardDeck.filter((card: { id: string }) => card.id !== cardToRemove.id)
      )
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

  function reset(storageItem: string) {
    localStorage.removeItem(storageItem);
    setCardDeck(incomingDeck);
    setCardIndex(0);
    setIsFlipped(false);
    setVocabToLearn([]);
  }

  function flipCard() {
    setIsFlipped((prevFlip) => !prevFlip);
  }

  const contextValue: FlashcardContextObj = {
    incomingDeck: incomingDeck,
    cardDeck: cardDeck,
    cardIndex: cardIndex,
    isFlipped: isFlipped,
    goForward: goForward,
    goBack: goBack,
    vocabLearnt: vocabLearnt,
    reviseVocab: reviseVocab,
    vocabToLearn: vocabToLearn,
    getCurrentState: getCurrentState,
    reset: reset,
    flipCard: flipCard,
    length: cardDeck.length,
  };

  return (
    <FlashcardContext.Provider value={contextValue}>
      {children}
    </FlashcardContext.Provider>
  );
}

export default FlashcardContextProvider;
