import NavBar from "./Navbar";
import DeckButton from "../UI/DeckButton";
import Container from "../UI/Container";
import Flashcard from "./Flashcard";
import { ReviseButton, LearntButton } from "../UI/Buttons";
import { ArrowForward, ArrowBack } from "../UI/Arrows";

import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  gap: 6em;
  padding: 2em;
`;

const FlashcardContainer = styled.div`
  display: flex;
  align-items: center;
`;

function FlashcardPage() {
  return (
    <>
      <NavBar />
      <Container>
        <p>セットボタンを押す時にメニューに戻る</p>
        <DeckButton to="/menu">セット　1</DeckButton>
        <FlashcardContainer>
          <ArrowBack onClick={undefined} />
          <Flashcard />
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
