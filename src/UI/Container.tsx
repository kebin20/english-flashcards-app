import React from 'react';
import styled from 'styled-components';
import { ContainerProps } from '../interfaces';

const StyledContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
height: 100vh;
gap: 1.3em;
padding-top: 6em;
z-index: -1;

@media only screen and (max-width: 600px) {
  padding-top: 16em;
}
`;

function Container(props: ContainerProps) {
  return <StyledContainer>{props.children}</StyledContainer>;
}

export default Container;
