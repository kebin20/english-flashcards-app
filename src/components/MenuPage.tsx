import NavBar from './Navbar';
import Button from '../UI/Button';
import styled from 'styled-components';
import DeckButton from '../UI/DeckButton';

const MenuContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
height: 100vh;
gap: 2em;
`;

const MenuBox = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
align-items: center;
gap: 2em;
border-radius: var(--round);
background-color: var(--clr-white);
box-shadow: var(--lg-shadow);
padding: 2em;
margin-inline: 2em;
text-align: center;
`;

function Menu() {
  return (
    <>
      <NavBar />
      <MenuContainer>
        <MenuBox>
          <Button>全部復習</Button>
          <DeckButton>セット 1</DeckButton>
          <DeckButton>セット 2</DeckButton>
          <DeckButton>セット 3</DeckButton>
          <DeckButton>セット 4</DeckButton>
          <DeckButton>セット 5</DeckButton>
          <DeckButton>セット 6</DeckButton>
        </MenuBox>
      </MenuContainer>
    </>
  );
}

export default Menu;
