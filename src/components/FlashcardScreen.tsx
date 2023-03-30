import NavBar from "./Navbar";
import DeckButton from "../UI/Buttons/DeckButton";
import Container from "../UI/Container";
import Flashcard from "./Flashcard";
import { ReviseButton, LearntButton } from "../UI/Buttons/Buttons";
import { ArrowForward, ArrowBack } from "../UI/Buttons/ArrowButtons";

import { FlashcardType } from "../interfaces";

import styled from "styled-components";
import { useState } from "react";

const ButtonContainer = styled.div`
  display: flex;
  gap: 6em;
  padding: 2em;
`;

const FlashcardContainer = styled.div`
  display: flex;
  align-items: center;
`;

function FlashcardPage({ deckData }: { deckData: FlashcardType }) {
  const { setNumber, card } = deckData;

  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  function goForward() {
    setCardIndex((prevIndex) =>
      cardIndex >= card.length - 1 ? 0 : prevIndex + 1
    );
  }

  function goBack() {
    setCardIndex((prevIndex) =>
      cardIndex <= card.length - 1 ? 0 : prevIndex - 1
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
        <FlashcardContainer>
          <ArrowBack onClick={goBack} />
          <Flashcard
            currentCard={card[cardIndex]}
            onFlip={flipCard}
            isFlipped={isFlipped}
          />
          <ArrowForward onClick={goForward} />
        </FlashcardContainer>
        <ButtonContainer>
          <ReviseButton>まだ。。</ReviseButton>
          <LearntButton>習った！</LearntButton>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default FlashcardPage;
