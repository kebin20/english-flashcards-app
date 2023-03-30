import styled from "styled-components";
import { FlashcardProps } from "../interfaces";

const StyledCardButton = styled.button`
  display: flex;
  flex-direction: column;
  padding: 1.5em 5em 3em 2.8em;
  border-radius: var(--rounder);
  border: transparent;
  background-color: var(--clr-white);
  box-shadow: var(--lg-shadow);
  margin-inline: 2em;
`;

const CardNumber = styled.span`
  margin-left: auto;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
`;

const Circle = styled.span`
  background-image: var(--clr-blue);
  display: grid;
  place-items: center;
  width: 3.1em;
  height: 3.1em;
  border-radius: 50%;
  aspect-ratio: 1;
  text-decoration: none;
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
        <Circle />
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
