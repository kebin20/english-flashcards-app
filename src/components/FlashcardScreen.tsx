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

  const [currentCard, setCurrentCard] = useState(card[0]);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <>
      <NavBar />
      <Container>
        <p>セットボタンを押す時にメニューに戻る</p>
        <DeckButton to="/menu">セット {setNumber}</DeckButton>
        <FlashcardContainer>
          <ArrowBack onClick={undefined} />
          <Flashcard currentCard={currentCard} isFlipped={isFlipped} />
          <ArrowForward onClick={undefined} />
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
