import React from 'react';
import styled from 'styled-components';
import { CardsContentType } from '../interfaces';

const StyledFlashcardContainer = styled.div`
background-color: lightpink;
display: flex;
`;

function FlashcardItem(props: any) {
  return (
    <>
    {props.deckCards.map((card: CardsContentType) => (
      <StyledFlashcardContainer>
      <span>{card.cardNumber}</span>
      <p>{card.japanese}</p>
      <p>{card.furigana}</p>
      <p>{card.english}</p>
      <button>T</button>
    </StyledFlashcardContainer>
    ))}
    </>
  );
}

export default FlashcardItem;
