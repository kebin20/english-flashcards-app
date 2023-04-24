import React, { useEffect } from "react";
import useFlashcard from "../hooks/useFlashcard";

import Container from "../UI/Container";
import FlashcardContainer from "../UI/FlashcardContainer";
import { ReviseButton, LearntButton, ResetButton } from "../UI/Buttons/Buttons";
import { AltDeckButton } from "../UI/Buttons/DeckSetButton";
import { ArrowForward, ArrowBack } from "../UI/Buttons/ArrowButtons";
import Flashcard from "../components/Flashcard";

import styled from "styled-components";

import { CardContentType } from "../interfaces";

const ButtonContainer = styled.div`
  display: flex;
  gap: 2em;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    gap: 0.9em;
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

function AllCardsPage({
  vocabData,
  incomingDeck,
  onPassVocabDataUp,
  storageItem,
}: {
  vocabData: CardContentType[];
  incomingDeck: CardContentType[];
  onPassVocabDataUp: (vocabToLearn: CardContentType[]) => void;
  storageItem: string;
}) {
  const {
    vocabToLearn,
    cardDeck,
    cardIndex,
    isFlipped,
    goForward,
    goBack,
    getCurrentState,
    vocabLearnt,
    reviseVocab,
    reset,
    flipCard,
  } = useFlashcard(incomingDeck);

console.log(incomingDeck)

  useEffect(() => {
    getCurrentState(storageItem);
  }, []);

  useEffect(() => {
    onPassVocabDataUp(vocabToLearn);
  }, [vocabToLearn]);

  return (
    <>
      <Container>
        <p>セットボタンを押すとメニューに戻る</p>
        <AltDeckButton to="/menu">
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
          <ReviseButton onClick={() => reviseVocab(storageItem)} to={""}>
            まだ。
          </ReviseButton>
          <LearntButton onClick={() => vocabLearnt(storageItem)} to={""}>
            覚えた！
          </LearntButton>
          <ResetButton onClick={() => reset(storageItem)} to={""}>
            リセット
          </ResetButton>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default AllCardsPage;
