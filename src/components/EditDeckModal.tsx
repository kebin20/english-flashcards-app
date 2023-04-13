import React from 'react';
import TextInput from '../UI/TextInput';
import styled from 'styled-components';

const InputContainer = styled.div`
display:flex;
gap: 0.5em;
flex-direction: column;
`;

function EditDeckModal() {
  return (
    <InputContainer>
      <label htmlFor="english">英語:</label>
      <TextInput />
      <label htmlFor="japanese">ふりがな：</label>
      <TextInput />
      <label htmlFor="japanese">日本語：</label>
      <TextInput />
    </InputContainer>
  );
}

export default EditDeckModal;
