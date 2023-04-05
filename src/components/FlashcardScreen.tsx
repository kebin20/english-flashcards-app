import NavBar from "./Navbar";
import Container from "../UI/Container";
import Flashcard from "./Flashcard";
import { AltDeckButton } from "../UI/Buttons/DeckButton";
import { ReviseButton, LearntButton, ResetButton } from "../UI/Buttons/Buttons";
import { ArrowForward, ArrowBack } from "../UI/Buttons/ArrowButtons";

import { FlashcardType } from "../interfaces";

import styled from "styled-components";
import { useState, useEffect } from "react";
import React from "react";

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
      if (event.code === "ArrowLeft") {
        // Handle left arrow key press
        goBack();
      } else if (event.code === "ArrowRight") {
        // Handle right arrow key press
        goForward();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [cardDeck, goForward, goBack]);

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
    setCardDeck((prevCardDeck: any[]) =>
      //underscore is used since we don't need the current element
      prevCardDeck.filter((_: any, index: number) => index !== cardIndex)
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
      <Container>
        <p>セットボタンを押す時にメニューに戻る</p>
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
                setNumber={0}
                cards={[]}
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
          <ReviseButton to={""}>まだ。。</ReviseButton>
          <LearntButton onClick={wordLearnt} to={""}>
            覚えた！
          </LearntButton>
          <ResetButton to={""}>リセット</ResetButton>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default FlashcardPage;
