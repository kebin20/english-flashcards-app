import React from 'react';
import TextInput from '../UI/TextInput';

function EditDeckPage() {
  return (
    <>
      <h1>Edit Deck</h1>
      <label htmlFor="first-name">Password*:</label>
      <TextInput />
      <h2>日本語</h2>
      <TextInput />
    </>
  );
}

export default EditDeckPage;
