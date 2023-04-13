import React from 'react';

import FlashcardItem from '../components/FlashcardItem';
import { AddButton } from '.././UI/Buttons/Buttons';

import styled from 'styled-components';
import { DeckDataProps } from '../interfaces';

const EditDeckContainer = styled.div`
display:flex;
gap: 1em;
flex-direction: column;
justify-content: center;
margin-inline: 2em;
padding-top: 6em;
padding-bottom: 6em;
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
}
`;

function EditDeckPage({ deckData }: DeckDataProps) {
  return (
    <>
      <EditDeckContainer>
        <h1>デック編集</h1>
        <label htmlFor="japanese">単語編集：</label>
        <VocabContainer>
          {deckData.map((deck: any, id: number) => (
            <ul>
              <h2>Set {deck.setNumber}</h2>
              {/* <AddButton type="submit" to={''}>
                +
              </AddButton> */}
              <FlashcardItem key={id} deckCards={deck.cards} />
            </ul>
          ))}
        </VocabContainer>
      </EditDeckContainer>
    </>
  );
}

export default EditDeckPage;
