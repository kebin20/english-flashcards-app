import React, {useEffect} from 'react';
import useFlashcard from '../hooks/useFlashcard';

import Container from '../UI/Container';
import Flashcard from '../components/Flashcard';
import { LearntButton } from '../UI/Buttons/Buttons';
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

function RevisePage({
  onPassRevisedVocabDataUp,
  incomingDeck,
  storageItem,
  vocabData,
}: {
  incomingDeck: CardContentType[];
  vocabData: CardContentType[];
  onPassRevisedVocabDataUp: (newVocabData: CardContentType[]) => void;
  storageItem: string;
}) {
  const {
    cardDeck,
    cardIndex,
    isFlipped,
    goForward,
    goBack,
    getCurrentState,
    vocabLearnt,
    flipCard,
  } = useFlashcard(incomingDeck, vocabData);

  useEffect(() => {
    getCurrentState(storageItem);
  }, []);

  useEffect(() => {
    onPassRevisedVocabDataUp(cardDeck);
  }, [vocabData]);

  return (
    <>
      <Container>
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
        {cardDeck.length === 0 && <FinishTitle>全部覚えた！</FinishTitle>}
        <ButtonContainer>
          <LearntButton onClick={() => vocabLearnt(storageItem)} to={''}>
            覚えた！
          </LearntButton>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default RevisePage;
