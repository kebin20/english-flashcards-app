import NavBar from "../components/Navbar";
import { MainLink } from "../UI/Buttons/Buttons";
import DeckButton from "../UI/Buttons/DeckButton";
import Container from "../UI/Container";

import styled from "styled-components";

import deckData from "../flashcard-data";

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
      <Container>
        <MenuBox>
          <MainLink
            deckData={deckData}
            className="grid-prop"
            to="/flashcard-page"
          >
            全部復習
          </MainLink>
          <DeckButton to="/set-one">
            セット {deckData[0].setNumber}
          </DeckButton>
          <DeckButton>セット 2</DeckButton>
          <DeckButton>セット 3</DeckButton>
          <DeckButton>セット 4</DeckButton>
          <DeckButton>セット 5</DeckButton>
          <DeckButton>セット 6</DeckButton>
        </MenuBox>
      </Container>
    </>
  );
}

export default Menu;
