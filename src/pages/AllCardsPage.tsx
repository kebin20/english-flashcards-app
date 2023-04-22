import React, { useContext, useEffect } from "react";
import Container from "../UI/Container";
import FlashcardContainer from "../UI/FlashcardContainer";
import { ReviseButton, LearntButton, ResetButton } from "../UI/Buttons/Buttons";
import { AltDeckButton } from "../UI/Buttons/DeckSetButton";
import { ArrowForward, ArrowBack } from "../UI/Buttons/ArrowButtons";
import Flashcard from "../components/Flashcard";

import { FlashcardContext } from "../store/flashcard-context";

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
  onPassVocabDataUp,
  storageItem,
}: {
  onPassVocabDataUp: (vocabToLearn: CardContentType[]) => void;
  storageItem: string;
}) {
  const flashcardCtx = useContext(FlashcardContext);

  useEffect(() => {
    flashcardCtx.getCurrentState(storageItem);
  }, [flashcardCtx.incomingDeck]);

  useEffect(() => {
    onPassVocabDataUp(flashcardCtx.vocabToLearn);
  }, [flashcardCtx.vocabToLearn]);

  return (
    <>
      <Container>
        <p>セットボタンを押すとメニューに戻る</p>
        <AltDeckButton to="/menu" className={undefined}>
          全部
        </AltDeckButton>
        {flashcardCtx.length !== 0 && (
          <>
            <FlashcardContainer>
              <ArrowBack onClick={flashcardCtx.goBack} />
              <Flashcard
                currentCard={flashcardCtx.cardDeck[flashcardCtx.cardIndex]}
                onFlip={flashcardCtx.flipCard}
                isFlipped={flashcardCtx.isFlipped}
              />
              <ArrowForward onClick={flashcardCtx.goForward} />
            </FlashcardContainer>
            <p>
              {flashcardCtx.cardIndex + 1}/{flashcardCtx.cardDeck.length}
            </p>
          </>
        )}
        {flashcardCtx.cardDeck.length === 0 && (
          <FinishTitle>勉強できる単語がない。</FinishTitle>
        )}
        <ButtonContainer>
          <ReviseButton
            onClick={() => flashcardCtx.reviseVocab(storageItem)}
            to={""}
          >
            まだ。
          </ReviseButton>
          <LearntButton
            onClick={() => flashcardCtx.vocabLearnt(storageItem)}
            to={""}
          >
            覚えた！
          </LearntButton>
          <ResetButton onClick={() => flashcardCtx.reset(storageItem)} to={""}>
            リセット
          </ResetButton>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default AllCardsPage;
