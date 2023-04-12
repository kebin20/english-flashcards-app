import React from 'react';

import FlashcardItem from '../components/FlashcardItem';
import { AddButton } from '.././UI/Buttons/Buttons';

import styled from 'styled-components';

const EditDeckContainer = styled.div`
display:flex;
gap: 1em;
flex-direction: column;
justify-content: center;
height: 90vh;
margin-inline: 2em;
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
`;

function EditDeckPage(props: any) {
  return (
    <>
      <EditDeckContainer>
        <h1>デック編集</h1>
        <label htmlFor="japanese">単語編集：</label>
        <VocabContainer>
          <ul>
            <h2>Set 1</h2>
            <AddButton type="submit" to={''}>
          +
        </AddButton>
            <FlashcardItem />
          </ul>
        </VocabContainer>
      </EditDeckContainer>
    </>
  );
}

export default EditDeckPage;
