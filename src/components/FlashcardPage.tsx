import NavBar from './Navbar';
import DeckButton from '../UI/DeckButton';
import Container from '../UI/Container';
import Flashcard from './Flashcard';
import { ReviseButton, LearntButton } from '../UI/Buttons';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonContainer = styled.div`
display: flex;
gap: 6em;
padding: 2em;
`;

function FlashcardPage() {
  return (
    <>
      <NavBar />
      <Container>
        <DeckButton>セット　1</DeckButton>
        <Flashcard />
        <ButtonContainer>
          <ReviseButton>まだ。。</ReviseButton>
          <LearntButton>習った！</LearntButton>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default FlashcardPage;
