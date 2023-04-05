import styled from 'styled-components';

const StyledContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
height: 100vh;
gap: 2em;
z-index: -1;
`;

function Container(props) {
  return <StyledContainer>{props.children}</StyledContainer>;
}

export default Container;
