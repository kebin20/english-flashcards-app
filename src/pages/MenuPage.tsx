import { MainLinkButton } from '../UI/Buttons/Buttons';
import { DeckButton } from '../UI/Buttons/DeckButton';
import Container from '../UI/Container';

import styled from 'styled-components';

import React from 'react';
import { FlashcardSetData } from '../interfaces';

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

function MenuPage({ deck }: { deck: FlashcardSetData[] }) {
  return (
    <>
      <Container>
        <MenuBox>
          <MainLinkButton className="grid-prop" to="/all-cards" deckData={[]}>
            全部のセット
          </MainLinkButton>
          {deck.map((item: FlashcardSetData, index: number) => (
            <DeckButton key={item.id} to={`/set-${index}`}>
              セット {item.setNumber}
            </DeckButton>
          ))}
        </MenuBox>
      </Container>
    </>
  );
}

export default MenuPage;
