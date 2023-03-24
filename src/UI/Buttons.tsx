import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
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
`;

const StyledMainButton = styled(Button)`
background-color: var(--clr-orange); 
color: var(--clr-dark);

&:hover, &:active {
  background-color: var(--clr-orange-hover);
}
`;

const StyledLearntButton = styled(Button)`
background-color: var(--clr-success);

&:hover, &:active {
  background-color: var(--clr-success-hover);
}
`;

const StyledReviseButton = styled(Button)`
background-color: var(--clr-alert);
color: var(--clr-white);

&:hover, &:active {
  background-color: var(--clr-alert-hover);
}
`;

function MainButton(props) {
  return (
    <StyledMainButton type={props.type || 'button'} onClick={props.onClick}>
      {props.children}
    </StyledMainButton>
  );
}

function ReviseButton(props) {
  return (
    <StyledReviseButton type={props.type || 'button'} onClick={props.onClick}>
      {props.children}
    </StyledReviseButton>
  );
}

function LearntButton(props) {
  return (
    <StyledLearntButton type={props.type || 'button'} onClick={props.onClick}>
      {props.children}
    </StyledLearntButton>
  );
}

export { MainButton, LearntButton, ReviseButton };
