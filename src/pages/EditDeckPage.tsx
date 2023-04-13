import React from 'react';

import FlashcardItem from '../components/FlashcardItem';

import styled from 'styled-components';
import { DeckDataProps } from '../interfaces';

const EditDeckContainer = styled.div`
display:flex;
gap: 1em;
flex-direction: column;
justify-content: center;
margin-inline: 2em;
padding-top: 6em;
padding-bottom: 6em;s
`;

const VocabContainer = styled.div`
border-radius: var(--round);
background-color: var(--clr-white);
box-shadow: var(--lg-shadow);
display: flex;
flex-direction: column;
align-items: center;
padding: 2em;
text-align: center;

& ul {
  display: grid;
  gap: 1.5em;
  padding-left: 0;
}
`;

function EditDeckPage({ deckData }: DeckDataProps) {
  return (
    <>
      <EditDeckContainer>
        <h1>デック編集</h1>
        <VocabContainer>
          {deckData.map((deck: any, id: number) => (
            <ul>
              <h2>Set {deck.setNumber}</h2>
              <FlashcardItem key={id} deckCards={deck.cards} />
            </ul>
          ))}
        </VocabContainer>
      </EditDeckContainer>
    </>
  );
}

export default EditDeckPage;
