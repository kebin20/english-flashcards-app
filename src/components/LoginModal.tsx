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

function LoginModal(props: any) {
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event: any) {
    event.preventDefault();
    const password = event.target.password.value;
    if (password === 'flashcard') {
      props.onSetLogin(true);
    } else {
      setErrorMessage('間違っています');
    }

    password === 'flashcard' ? props.onSetLogin(true) : props.onSetLogin(false);
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
