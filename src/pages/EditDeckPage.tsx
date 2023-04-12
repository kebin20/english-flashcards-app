import React from 'react';
import TextInput from '../UI/TextInput';

import styled from 'styled-components';

const EditDeckContainer = styled.div`
display:flex;
gap: 1em;
flex-direction: column;
justify-content: center;
height: 90vh;
margin-inline: 2em;
`;

const InputContainer = styled.div`
display:flex;
gap: 0.5em;
flex-direction: column;
`;

const VocabContainer = styled. div`
border-radius: var(--round);
background-color: var(--clr-white);
box-shadow: var(--lg-shadow);
display: flex;
flex-direction: column;
align-items: center;
padding: 2em;
text-align: center;
`


function EditDeckPage() {
  return (
    <>
      <EditDeckContainer>
        <h1>デック編集</h1>
        <InputContainer>
          <label htmlFor="english">英語:</label>
          <TextInput />
          <label htmlFor="japanese">ふりがな：</label>
          <TextInput />
          <label htmlFor="japanese">日本語：</label>
          <TextInput />
        </InputContainer>
        <label htmlFor="japanese">単語編集：</label>
        <VocabContainer>
        </VocabContainer>
      </EditDeckContainer>
    </>
  );
}

export default EditDeckPage;
