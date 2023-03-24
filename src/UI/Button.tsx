import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-block;
  padding: 1em 2em;
  font-family: var(--ff-jp-title);
  background-color: var(--clr-orange);
  color: var(--clr-dark);
  border-radius: var(--round);
  border: none;
  box-shadow: var(--shadow);
  font-size: 1.125rem;
  line-height: 1.6rem;
  cursor: pointer;

&:hover, &:active {
  background-color: var(--clr-orange-hover);
}
`;

export default function MainButton(props) {
  return (
    <StyledButton
      type={props.type || 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </StyledButton>
  );
}
