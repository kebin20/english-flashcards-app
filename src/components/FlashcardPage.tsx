import NavBar from './Navbar';
import DeckButton from '../UI/DeckButton';
import Container from '../UI/Container';
import Flashcard from './Flashcard';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

function FlashcardPage() {
  return (
    <>
      <NavBar />
      <Container>
        <DeckButton>セット　1</DeckButton>
        <Flashcard />
      </Container>
    </>
  );
}

export default FlashcardPage;
