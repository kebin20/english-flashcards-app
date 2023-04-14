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

function Menu({deck}: any) {
  return (
    <>
      <Container>
        <MenuBox>
          <MainLinkButton className="grid-prop" to="/all-cards" deckData={[]}>
            全部復習
          </MainLinkButton>
          {deck.map((_: any, index: number) => (
            <DeckButton to={`/set-${index}`}>セット {index + 1}</DeckButton>
          ))}
        </MenuBox>
      </Container>
    </>
  );
}

export default Menu;
