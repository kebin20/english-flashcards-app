import React, { useState } from 'react';
import styled from 'styled-components';
import { CardsContentType } from '../interfaces';
import Editable from './Editable';

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
  // State for the inputs
  const [fuText, setFuText] = useState('');
  const [enText, setEnText] = useState('');
  const [jpText, setJpText] = useState('');

  console.log(fuText, enText, jpText);

  return (
    <>
      {props.deckCards.map((card: CardsContentType) => (
        <StyledFlashcardContainer>
          <span>{card.cardNumber}.</span>
          <Editable
            text={card.japanese}
            placeholder="{card.japanese}"
            type="input"
          >
            <input
              type="text"
              name="japanese input"
              placeholder=""
              value={card.japanese}
              onChange={(e) => setJpText(e.target.value)}
            />
          </Editable>
          <Editable
            text={card.furigana}
            placeholder={card.furigana}
            type="input"
          >
            <input
              type="text"
              name="furigana input"
              placeholder={card.furigana}
              value={card.furigana}
              onChange={(e) => setFuText(e.target.value)}
            />
          </Editable>
          <Editable
            text={card.english}
            placeholder={card.japanese}
            type="input"
          >
            <input
              type="text"
              name="task"
              placeholder={card.english}
              value={card.english}
              onChange={(e) => setEnText(e.target.value)}
            />
          </Editable>
          <button>T</button>
        </StyledFlashcardContainer>
      ))}
    </>
  );
}

export default FlashcardItem;
