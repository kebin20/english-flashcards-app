import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonType, MainLinkProps } from '../../interfaces';

const Button = styled.button`
  displa
type: string;
[x: string]: string;
type: string;
type: string;y: inline-block;
  padding: 1em 3em;
  font-family: var(--ff-jp-title);
  background-color: var(--clr-orange);
  color: var(--clr-dark);
  border-radius: var(--round);
  border: none;
  box-shadow: var(--md-shadow);
  font-size: 1.25rem;
  line-height: 1.6rem;
  cursor: pointer;
`;

const StyledLinkButton = styled(Link)`
  display: inline-block;
  padding: 1em 3em;
  font-family: var(--ff-jp-title);
  background-color: var(--clr-orange);
  color: var(--clr-dark);
  border-radius: var(--round);
  border: none;
  box-shadow: var(--md-shadow);
  font-size: 1.25rem;
  line-height: 1.6rem;
  cursor: pointer;

  background-color: var(--clr-orange);
  color: var(--clr-dark);

  &:hover,
  &:active {
    background-color: var(--clr-orange-hover);
  }
`;

const StyledLearntButton = styled(Button)`
  background-color: var(--clr-success);

  &:hover,
  &:active {
    background-color: var(--clr-success-hover);
  }
`;

const StyledReviseButton = styled(Button)`
  background-color: var(--clr-alert);
  color: var(--clr-white);

  &:hover,
  &:active {
    background-color: var(--clr-alert-hover);
  }
`;

const StyledResetButton = styled(Button)`
  background-color: var(--clr-orange);
  color: var(--clr-dark);

  &:hover,
  &:active {
    background-color: var(--clr-orange-hover);
  }
`;

function MainLink(props: MainLinkProps) {
  return (
    <StyledLinkButton className={props.className} to={props.to}>
      {props.children}
    </StyledLinkButton>
  );
}

function ReviseButton(props: ButtonType) {
  return (
    <StyledReviseButton type={props.type || 'button'} onClick={props.onClick}>
      {props.children}
    </StyledReviseButton>
  );
}

function LearntButton(props: ButtonType) {
  return (
    <StyledLearntButton type={props.type || 'button'} onClick={props.onClick}>
      {props.children}
    </StyledLearntButton>
  );
}

function ResetButton(props: ButtonType) {
  return (
    <StyledResetButton type={props.type || 'button'} onClick={props.onClick}>
      {props.children}
    </StyledResetButton>
  );
}

export { MainLink, LearntButton, ReviseButton, ResetButton };
