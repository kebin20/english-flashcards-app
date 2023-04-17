import React, { useState } from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../UI/Buttons/Buttons';

const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
padding: 2em;
margin: auto;
margin-top: 5em;
gap: 1em;
`;

const StyledErrorMessage = styled.p`
color: red;
`;

function LoginModal({ onSetLogin }: { onSetLogin: (arg0: boolean) => void }) {
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = event.currentTarget.password.value;
    if (password === 'flashcard') {
      onSetLogin(true);
    } else {
      setErrorMessage('間違っています');
    }

    password === 'flashcard' ? onSetLogin(true) : onSetLogin(false);
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="pass">パスワード:</label>
        <input type="password" id="pass" name="password" required />
        {errorMessage && (
          <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
        )}
        <PrimaryButton type="submit" deckData={[]} to={''}>
          ログイン
        </PrimaryButton>
      </StyledForm>
    </>
  );
}

export default LoginModal;
