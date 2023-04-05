import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React from 'react';
import { ButtonType } from '../../interfaces';

const StyledDeckButton = styled(Link)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5em;
  padding: 0.7em 1em;
  font-family: var(--ff-jp-title);
  background-color: var(--clr-cream);
  color: var(--clr-dark);
  border-radius: var(--round);
  border: none;
  box-shadow: var(--md-shadow);
  font-size: 1.25rem;
  line-height: 1.6rem;
  cursor: pointer;

  &:hover,
  &:active {
    color: var(--clr-dark-hover);
  }

  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    padding: 0.7em 1.5em;
  }
`;

const Circle = styled.span`
  background-color: var(--clr-white);
  display: grid;
  place-items: center;
  padding: 0.6em;
  border-radius: 50%;
  aspect-ratio: 1;
  text-decoration: none;
`;

function DeckButton(props: ButtonType) {
  return (
    <StyledDeckButton to={props.to}>
      <Circle />
      {props.children}
    </StyledDeckButton>
  );
}

function AltDeckButton(props: ButtonType) {
  return <StyledDeckButton to={props.to}>{props.children}</StyledDeckButton>;
}

export { DeckButton, AltDeckButton };
