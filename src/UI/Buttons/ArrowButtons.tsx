import React from 'react';
import styled from 'styled-components';
import { ArrowButtonProps } from '../../interfaces';

const StyledArrowBack = styled.svg`
transform: rotate(-0.5turn);
`;

function ArrowForward({ onClick }: ArrowButtonProps) {
  return (
    <svg
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      role="button"
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 96 960 960"
      width="48"
    >
      <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
    </svg>
  );
}

function ArrowBack({ onClick }: ArrowButtonProps) {
  return (
    <StyledArrowBack
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      role="button"
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 96 960 960"
      width="48"
    >
      <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
    </StyledArrowBack>
  );
}

export { ArrowForward, ArrowBack };
