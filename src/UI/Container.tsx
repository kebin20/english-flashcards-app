import React from 'react';
import styled from 'styled-components';
import { ContainerType } from '../interfaces';

const StyledContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
height: 100vh;
gap: 1.3em;
z-index: -1;
`;

function Container(props: ContainerType) {
  return <StyledContainer>{props.children}</StyledContainer>;
}

export default Container;
