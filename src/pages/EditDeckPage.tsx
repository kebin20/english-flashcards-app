import React from 'react';
import TextInput from '../UI/TextInput';

import styled from 'styled-components';

const EditDeckContainer = styled.div`
display:flex;
gap: 2em;
flex-direction: column;
align-items: center;
justify-content: center;
height: 90vh;
`;

const InputContainer = styled.div`
display:flex;
gap: 0.5em;
flex-direction: column;
`;

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
      </EditDeckContainer>
    </>
  );
}

export default EditDeckPage;
