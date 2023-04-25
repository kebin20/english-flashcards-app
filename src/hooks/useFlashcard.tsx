import { useEffect, useState } from 'react';

import { CardContentType } from '../interfaces';

function useFlashcard(
  incomingDeck: CardContentType[],
  vocabData: CardContentType[]
) {
  const [cardDeck, setCardDeck] = useState(incomingDeck);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [vocabToLearn, setVocabToLearn] =
    useState<CardContentType[]>(vocabData);

  // Get the current state of the flashcards and display it on screen
  function getCurrentState(storageItem: string) {
    const storedCardDeck = JSON.parse(
      localStorage.getItem(storageItem) || '[]'
    );
    if (storedCardDeck.length > 0) {
      setCardDeck(storedCardDeck);
    }
  }

  //Vocab navigation with arrow keys
  function handleKeyDown(event: { code: string }) {
    if (event.code === 'ArrowLeft') {
      // Handle left arrow key press
      goBack();
    } else if (event.code === 'ArrowRight') {
      // Handle right arrow key press
      goForward();
    } else if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      flipCard();
    } else if (event.code === 'Space') {
      // Handle space key press
      flipCard();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
    const newDeck = cardDeck.filter((card) => card.id !== cardToRemove.id);
    setCardDeck(newDeck);
    // To store current state of deck
    localStorage.setItem(storageItem, JSON.stringify(newDeck));
  }

  function reviseVocab(storageItem: string) {
    const cardToRemove = cardDeck[cardIndex];
    const newDeck = cardDeck.filter(
      (card: { id: string }) => card.id !== cardToRemove.id
    );
    // To store current state of deck
    localStorage.setItem(storageItem, JSON.stringify(newDeck));

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
  return {
    cardDeck,
    setCardDeck,
    cardIndex,
    setCardIndex,
    isFlipped,
    setIsFlipped,
    vocabToLearn,
    setVocabToLearn,
    getCurrentState,
    goForward,
    goBack,
    vocabLearnt,
    reviseVocab,
    reset,
    flipCard,
  };
}
export default useFlashcard;
