import React from 'react';
import styled from 'styled-components';
import { FlashcardProps } from '../interfaces';

const StyledCardButton = styled.button`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 1.5em 1.5em 1.5em 4em;
  border-radius: var(--rounder);
  border: transparent;
  background-color: var(--clr-white);
  box-shadow: var(--lg-shadow);
  margin-inline: 2em;

  @media only screen and (max-width: 600px) {
    font-size: var(--fs-200);
    margin-inline: 0em;
  }
`;

const CardNumber = styled.span`
  position: absolute;
  right: 90%;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;

  @media only screen and (max-width: 600px) {
    gap: 3em;
  }
`;

const EnglishSide = styled.div`
  display: flex;
  flex-direction: column;
`;

function Flashcard({ isFlipped, currentCard, onFlip }: FlashcardProps) {
  const { cardNumber, english, furigana, japanese } = currentCard;

  return (
    <StyledCardButton onClick={onFlip}>
      <CardNumber>{cardNumber}</CardNumber>
      <InnerContainer>
        {!isFlipped && <h1>{japanese}</h1>}
        {isFlipped && (
          <EnglishSide>
            <p>{furigana}</p>
            <h1>{english}</h1>
          </EnglishSide>
        )}
      </InnerContainer>
    </StyledCardButton>
  );
}

export default Flashcard;
