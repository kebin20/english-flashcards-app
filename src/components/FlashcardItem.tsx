import React from 'react';
import styled from 'styled-components';

const StyledFlashcardContainer = styled.div`
background-color: lightpink;
display: flex;
`;

function FlashcardItem() {
  return (
    <>
      <StyledFlashcardContainer>
        <span>1.</span>
        <p>Japanese</p>
        <p>Furigana</p>
        <p>English</p>
        <button>Trash button</button>
      </StyledFlashcardContainer>
    </>
  );
}

export default FlashcardItem;
