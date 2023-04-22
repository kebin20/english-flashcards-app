import React, { useState, useEffect } from "react";
import Container from "../UI/Container";
import FlashcardContainer from "../UI/FlashcardContainer";
import { AltDeckButton } from "../UI/Buttons/DeckSetButton";
import { ReviseButton, LearntButton, ResetButton } from "../UI/Buttons/Buttons";
import { ArrowForward, ArrowBack } from "../UI/Buttons/ArrowButtons";
import Flashcard from "./Flashcard";

import { CardContentType, FlashcardSetData } from "../interfaces";

import styled from "styled-components";

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
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [cardDeck, goForward, goBack, flipCard]);

  // Main button functions

  function vocabLearnt() {
    const cardToRemove = cardDeck[cardIndex];
    const newCardDeck = cardDeck.filter((card) => card.id !== cardToRemove.id);
    setCardDeck(newCardDeck);
    localStorage.setItem(
      `cardDeckSet${setNumber}`,
      JSON.stringify(newCardDeck)
    );
  }

  function reviseVocab() {
    const cardToRemove = cardDeck[cardIndex];
    const newCardDeck: CardContentType[] = cardDeck.filter(
      (card) => card.id !== cardToRemove.id
    );

    //To make sure same cards are not being added
    const vocabToLearnArr = vocabToLearn.find(
      (card) => card.id === cardToRemove.id
    )
      ? [...vocabToLearn]
      : [...vocabToLearn, cardToRemove];
    setCardDeck(newCardDeck);
    setVocabToLearn(vocabToLearnArr);
    localStorage.setItem(
      `cardDeckSet${setNumber}`,
      JSON.stringify(newCardDeck)
    );
  }

  useEffect(() => {
    const savedDeck = localStorage.getItem(`cardDeckSet${setNumber}`);
    if (savedDeck) {
      setCardDeck(JSON.parse(savedDeck));
    }
  }, [setNumber]);

  useEffect(() => {
    onPassVocabDataUp(vocabToLearn);
  }, [vocabToLearn]);

  function reset() {
    localStorage.removeItem(`cardDeckSet${setNumber}`);
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
          <ReviseButton onClick={reviseVocab} to={""}>
            まだ。
          </ReviseButton>
          <LearntButton onClick={vocabLearnt} to={""}>
            覚えた！
          </LearntButton>
          <ResetButton onClick={reset} to={""}>
            リセット
          </ResetButton>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default FlashcardScreen;
