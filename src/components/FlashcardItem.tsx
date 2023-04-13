import React from 'react';
import styled from 'styled-components';
import { CardsContentType } from '../interfaces';

const StyledFlashcardContainer = styled.div`
background-color: var(--clr-light);
border-radius: var(--round);
box-shadow: var(--lg-shadow);
display: flex;
justify-content: flex-start;
gap: 3em;
padding: 1.5em;

& p {
  border-bottom: 0.5px solid lightgrey;
}

& button {
  background: transparent;
  border: transparent;
}
`;

function FlashcardItem(props: any) {
  return (
    <>
      {props.deckCards.map((card: CardsContentType) => (
        <StyledFlashcardContainer>
          <span>{card.cardNumber}.</span>
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
