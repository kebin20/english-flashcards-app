import NavBar from './Navbar';
import DeckButton from '../UI/DeckButton';
import Container from '../UI/Container';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';

function FlashcardPage() {
  return (
    <>
      <Navbar />
      <Container>
        <DeckButton>セット　1</DeckButton>
      </Container>
    </>
  );
}

export default FlashcardPage;
