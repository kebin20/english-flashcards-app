import React, { useState, useEffect } from 'react';
import Container from '../UI/Container';
import Flashcard from './Flashcard';
import { AltDeckButton } from '../UI/Buttons/DeckButton';
import { ReviseButton, LearntButton, ResetButton } from '../UI/Buttons/Buttons';
import { ArrowForward, ArrowBack } from '../UI/Buttons/ArrowButtons';

import { CardContentType, FlashcardSetData } from '../interfaces';

import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  gap: 2em;


  @media only screen and (max-width: 600px) {
    flex-direction: column;
    gap: 0.9em;
  }
`;

const FlashcardWrapper = styled.div`
display: grid;
grid-template-columns: 0.5fr 2fr 0.5fr;
grid-template-rows: 1fr;
align-items: center;
justify-items: center;
width: 55em;

@media only screen and (max-width: 900px) {
  width: 40.5em;
  }

@media only screen and (max-width: 600px) {
width: 22.5em;
}
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
  deckData,
  onPassVocabDataUp,
  vocabData,
}: {
  deckData: FlashcardSetData;
  onPassVocabDataUp: (
    newVocabData: React.SetStateAction<CardContentType[]>
  ) => void;
  vocabData: CardContentType[];
}) {
  const { setNumber, cards } = deckData;

  const [cardDeck, setCardDeck] = useState(cards);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [vocabToLearn, setVocabToLearn] =
    useState<CardContentType[]>(vocabData);

  useEffect(() => {
    const storedCardDeck = JSON.parse(localStorage.getItem('cardDeck') || '[]');
    if (storedCardDeck.length > 0) {
      setCardDeck(storedCardDeck);
    }
  }, []);

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
    setCardDeck((prevCardDeck) =>
      //underscore is used since we don't need the current element
      prevCardDeck.filter((_: any, index: number) => index !== cardIndex)
    );
    // Update cardIndex if it is pointing to an index that is out of range after removing cards
    setCardIndex((prevIndex) =>
      prevIndex >= cardDeck.length - 1 ? 0 : prevIndex
    );
    localStorage.setItem(
      'cardDeck',
      JSON.stringify(
        cardDeck.filter((_: any, index: number) => index !== cardIndex)
      )
    );
  }

  function reviseVocab() {
    const newDeck: CardContentType[] = cardDeck.filter(
      (_: any, index: number) => index !== cardIndex
    );
    const removedVocabArrItem = cardDeck[cardIndex];
    const vocabToLearnArr = [...vocabToLearn, removedVocabArrItem];

    setCardIndex((prevIndex) =>
      prevIndex >= cardDeck.length - 1 ? 0 : prevIndex
    );
    setCardDeck(newDeck);
    setVocabToLearn(vocabToLearnArr);
  }

  useEffect(() => {
    onPassVocabDataUp(vocabToLearn);
  }, [vocabToLearn]);

  function reset() {
    localStorage.removeItem('cardDeck');
    setCardDeck(cards);
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
          セット {setNumber}
        </AltDeckButton>
        {cardDeck.length !== 0 && (
          <>
            <FlashcardWrapper>
              <ArrowBack onClick={goBack} />
              <Flashcard
                currentCard={cardDeck[cardIndex]}
                onFlip={flipCard}
                isFlipped={isFlipped}
              />
              <ArrowForward onClick={goForward} />
            </FlashcardWrapper>
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
