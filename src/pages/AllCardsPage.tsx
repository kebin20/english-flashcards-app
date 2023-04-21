import React, { useState, useEffect } from 'react';
import Container from '../UI/Container';
import Flashcard from '../components/Flashcard';
import { ReviseButton, LearntButton, ResetButton } from '../UI/Buttons/Buttons';
import { AltDeckButton } from '../UI/Buttons/DeckButton';
import { ArrowForward, ArrowBack } from '../UI/Buttons/ArrowButtons';

import { CardContentType } from '../interfaces';

import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  gap: 2em;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    gap: 0.9em;
  }
`;

const FlashcardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

const FinishTitle = styled.h1`
  padding: 2em;
  border-radius: var(--round);
  border: transparent;
  background-color: var(--clr-white);
  box-shadow: var(--lg-shadow);
  text-align: center;
`;

function FlashcardScreen({
  allCards,
  onPassVocabDataUp,
  vocabData,
}: {
  allCards: CardContentType[];
  onPassVocabDataUp: (
    newVocabData: React.SetStateAction<CardContentType[]>
  ) => void;
  vocabData: CardContentType[];
}) {
  const [cardDeck, setCardDeck] = useState(allCards);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [vocabToLearn, setVocabToLearn] =
    useState<CardContentType[]>(vocabData);

  // Get the current state of the flashcards and display it on screen
  useEffect(() => {
    const storedCardDeck = JSON.parse(
      localStorage.getItem('allCardsDeck') || '[]'
    );
    if (storedCardDeck.length > 0) {
      setCardDeck(storedCardDeck);
    }
  }, [allCards]);

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
  useEffect(() => {
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
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
      'allCardsDeck',
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
      'allCardsDeck',
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
    localStorage.removeItem('allCardsDeck');
    setCardDeck(allCards);
    setCardIndex(0);
    setIsFlipped(false);
    setVocabToLearn([]);
  }

  function flipCard() {
    setIsFlipped((prevFlip) => !prevFlip);
  }

  return (
    <>
      <Container>
        <p>セットボタンを押すとメニューに戻る</p>
        <AltDeckButton to="/menu" className={undefined}>
          全部
        </AltDeckButton>
        {cardDeck.length !== 0 && (
          <>
            <FlashcardContainer>
              <ArrowBack onClick={goBack} />
              <Flashcard
                currentCard={cardDeck[cardIndex]}
                onFlip={flipCard}
                isFlipped={isFlipped}
              />
              <ArrowForward onClick={goForward} />
            </FlashcardContainer>
            <p>
              {cardIndex + 1}/{cardDeck.length}
            </p>
          </>
        )}
        {cardDeck.length === 0 && (
          <FinishTitle>勉強できる単語がない。</FinishTitle>
        )}
        <ButtonContainer>
          <ReviseButton onClick={reviseVocab} to={''}>
            まだ。
          </ReviseButton>
          <LearntButton onClick={vocabLearnt} to={''}>
            覚えた！
          </LearntButton>
          <ResetButton onClick={reset} to={''}>
            リセット
          </ResetButton>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default FlashcardScreen;
