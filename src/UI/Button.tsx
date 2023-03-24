import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-block;
  padding: 1em 2em;
  font-family: var(--ff-jp-title);
  background-color: var(--main-button-default);
  color: var(--lightCream);
  border-radius: 6px;
  border: none;
  font-size: 1.125rem;
  line-height: 1.6rem;
  cursor: pointer;

&:hover, &:active {
  background-color: var(--main-button-hover);
}

`;

export default function MainButton(props) {
  return (
    <button
      type={props.type || 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
