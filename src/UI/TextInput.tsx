import React, { useState } from 'react';
import { AddButton } from './Buttons/Buttons';

import styled from 'styled-components';

const TextInputContainer = styled.div`
display: flex;
flex-direction: row-reverse;
justify-content: flex-end;
gap: 2em;
`;

function TextInput(props: any) {
  const [enteredValue, setEnteredValue] = useState('');

  function todoInputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEnteredValue((event.target as HTMLButtonElement).value);
  }

  function formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enteredValue.trim().length > 0) {
      props.onAddTodo(enteredValue);
    }
    setEnteredValue('');
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <TextInputContainer>
        <AddButton type="submit" to={''}>
          +
        </AddButton>
        <input
          value={enteredValue}
          type="text"
          onChange={todoInputChangeHandler}
        />
      </TextInputContainer>
    </form>
  );
}

export default TextInput;
