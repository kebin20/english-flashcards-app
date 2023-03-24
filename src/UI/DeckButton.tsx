import styled from 'styled-components';

const StyledDeckButton = styled.button`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
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

&:hover, &:active {
color: var(--clr-dark-hover);
}
`;

const Circle = styled.span`
background-color: var(--clr-white);
display: grid;
place-items: center;
width: 1em;
height:1em;
border-radius: 50%;
aspect-ratio: 1;
text-decoration: none;
`;

function DeckButton(props) {
  return (
    <StyledDeckButton type={props.type || 'button'} onClick={props.onClick}>
      <Circle />
      {props.children}
    </StyledDeckButton>
  );
}

export default DeckButton;
