import React from "react";
import styled from "styled-components";
import { ContainerProps } from "../interfaces";

const StyledFlashcardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5em;
  width: 55em;

  @media only screen and (max-width: 600px) {
    width: auto;
  }
`;

function FlashcardContainer(props: ContainerProps) {
  return <StyledFlashcardContainer>{props.children}</StyledFlashcardContainer>;
}

export default FlashcardContainer;
