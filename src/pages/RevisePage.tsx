import React, { useState, useEffect, useContext } from "react";
import useFlashcard from "../hooks/useFlashcard";

import Container from "../UI/Container";
import Flashcard from "../components/Flashcard";
import { LearntButton } from "../UI/Buttons/Buttons";
import { ArrowForward, ArrowBack } from "../UI/Buttons/ArrowButtons";

import { CardContentType } from "../interfaces";

import styled from "styled-components";

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
}: {
  incomingDeck: CardContentType[];
  onPassRevisedVocabDataUp: (
    newVocabData: React.SetStateAction<CardContentType[]>
  ) => void;
}) {
  // const [cardDeck, setCardDeck] = useState(vocabData);
  // const [cardIndex, setCardIndex] = useState(0);

  // const { isFlipped, flipCard } = useContext(FlashcardContext);

  // // Get the current state of the flashcards and display it on screen
  // useEffect(() => {
  //   const storedRevisedCardsDeck = JSON.parse(
  //     localStorage.getItem("revisedCardsDeck") || "[]"
  //   );
  //   if (storedRevisedCardsDeck.length > 0) {
  //     setCardDeck(storedRevisedCardsDeck);
  //   }
  // }, []);

  // //Vocab navigation
  // function goForward() {
  //   setCardIndex((prevIndex) =>
  //     prevIndex >= cardDeck.length - 1 ? 0 : prevIndex + 1
  //   );
  // }

  // function goBack() {
  //   setCardIndex((prevIndex) =>
  //     prevIndex <= 0 ? cardDeck.length - 1 : prevIndex - 1
  //   );
  // }

  // // Main button functions

  // function vocabLearnt() {
  //   const cardToRemove = cardDeck[cardIndex];
  //   setCardDeck((prevDeck) =>
  //     prevDeck.filter((card) => card.id !== cardToRemove.id)
  //   );
  //   // To store current state of deck
  //   localStorage.setItem(
  //     "revisedCardsDeck",
  //     JSON.stringify(cardDeck.filter((card) => card.id !== cardToRemove.id))
  //   );
  // }

  // useEffect(() => onPassRevisedVocabDataUp(cardDeck), [vocabData]);

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
          <LearntButton onClick={vocabLearnt} to={""}>
            覚えた！
          </LearntButton>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default RevisePage;
