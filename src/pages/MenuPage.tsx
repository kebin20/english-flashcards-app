import { MainLinkButton } from "../UI/Buttons/Buttons";
import { DeckSetButton } from "../UI/Buttons/DeckSetButton";
import Container from "../UI/Container";

import styled from "styled-components";

import React from "react";
import { FlashcardSetData } from "../interfaces";

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

  @media only screen and (max-width: 600px) {
    margin-top: 12.5em;
  }

  @media only screen and (max-width: 380px) {
    margin-top: 20.5em;
  }
`;

function MenuPage({ deck }: { deck: FlashcardSetData[] }) {
  return (
    <>
      <Container>
        <MenuBox>
          <MainLinkButton className="grid-prop" to="/all-cards" deckData={[]}>
            全部のセット
          </MainLinkButton>
          {deck.map((item: FlashcardSetData, index: number) => (
            <DeckSetButton key={item.id} to={`/set-${index}`}>
              セット {item.setNumber}
            </DeckSetButton>
          ))}
        </MenuBox>
      </Container>
    </>
  );
}

export default MenuPage;
