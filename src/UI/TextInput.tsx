import React, { useState } from 'react';

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
        <input
          value={enteredValue}
          type="text"
          onChange={todoInputChangeHandler}
        />
    </form>
  );
}

export default TextInput;
