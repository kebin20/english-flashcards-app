import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5em 5em 3em 2.8em;
  border-radius: var(--rounder);
  background-color: var(--clr-white);
  box-shadow: var(--lg-shadow);
  margin-inline: 2em;
`;

const CardNumber = styled.span`
  margin-left: auto;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
`;

const Circle = styled.span`
  background-image: var(--clr-blue);
  display: grid;
  place-items: center;
  width: 3.1em;
  height: 3.1em;
  border-radius: 50%;
  aspect-ratio: 1;
  text-decoration: none;
`;

function Flashcard(props) {
  return (
    <StyledCard>
      <CardNumber>29</CardNumber>
      <InnerContainer>
        <Circle />
        <h1>あなたの誕生日はいつですか。</h1>
      </InnerContainer>
    </StyledCard>
  );
}

export default Flashcard;
