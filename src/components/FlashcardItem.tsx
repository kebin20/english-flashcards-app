import React from 'react';
import styled from 'styled-components';

const StyledFlashcardContainer = styled.div`
background-color: lightpink;
display: flex;
`;

function FlashcardItem({cardNumber,furigana,english,japanese }) {
  return (
    <>
      <StyledFlashcardContainer>
        <span>{cardNumber}</span>
        <p>{japanese}</p>
        <p>{furigana}</p>
        <p>{english}</p>
        <button>T</button>
      </StyledFlashcardContainer>
    </>
  );
}

export default FlashcardItem;
