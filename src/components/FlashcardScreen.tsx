import NavBar from './Navbar';
import DeckButton from '../UI/Buttons/DeckButton';
import Container from '../UI/Container';
import Flashcard from './Flashcard';
import { ReviseButton, LearntButton, ResetButton } from '../UI/Buttons/Buttons';
import { ArrowForward, ArrowBack } from '../UI/Buttons/ArrowButtons';

import { FlashcardType } from '../interfaces';

import styled from 'styled-components';
import { useState, useEffect } from 'react';

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

function FlashcardPage({ deckData }: { deckData: FlashcardType }) {
  const { setNumber, cards } = deckData;

  const [cardDeck, setCardDeck] = useState(cards);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: { code: string }) {
      if (event.code === 'ArrowLeft') {
        // Handle left arrow key press
        goBack();
      } else if (event.code === 'ArrowRight') {
        // Handle right arrow key press
        goForward();
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [cardDeck, goForward, goBack]);

  console.log('cardIndex:', cardIndex);
  console.log('cardDeck.length:', cardDeck.length);

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

  function wordLearnt() {
    setCardDeck((prevCardDeck) =>
      //underscore is used since we don't need the current element
      prevCardDeck.filter((_, index) => index !== cardIndex)
    );
    // Update cardIndex if it is pointing to an index that is out of range after removing cards
    setCardIndex((prevIndex) =>
      prevIndex >= cardDeck.length - 1 ? 0 : prevIndex
    );
  }

  function flipCard() {
    setIsFlipped((prevFlip) => !prevFlip);
  }

  return (
    <>
      <NavBar />
      <Container>
        <p>セットボタンを押す時にメニューに戻る</p>
        <DeckButton to="/menu">セット {setNumber}</DeckButton>
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
        {cardDeck.length === 0 && <FinishTitle>全部習った！</FinishTitle>}
        <ButtonContainer>
          <ReviseButton>まだ。。</ReviseButton>
          <LearntButton onClick={wordLearnt}>覚えた！</LearntButton>
          <ResetButton>リセット</ResetButton>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default FlashcardPage;
