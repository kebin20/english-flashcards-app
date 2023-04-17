import React from 'react';
import styled from 'styled-components';
import { Button } from '../UI/Buttons/Buttons';

const StyledForm = styled.div`
display: flex;
flex-direction: column;
padding: 2em;
gap: 1em;
`;

function LoginModal(props: any) {
  function handleSubmit(event: any) {
    event.preventDefault();
    const password = event.target.password.value;
    password === 'flashcard' ? props.onSetLogin(true) : props.onSetLogin(false);
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="pass">Password:</label>
        <input type="password" id="pass" name="password" required />
        <Button type="submit">Login</Button>
      </StyledForm>
    </>
  );
}

export default LoginModal;
