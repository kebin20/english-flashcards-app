import React, { useState } from 'react';

import EditFlashcard from '../components/EditFlashcard';
import LoginModal from '../components/LoginModal';

import styled from 'styled-components';
import { CardContentType, DeckDataProps, FlashcardSetData } from '../interfaces';

const EditDeckContainer = styled.div`
display:flex;
gap: 1em;
flex-direction: column;
justify-content: center;
margin-inline: 2em;
padding-top: 6em;
padding-bottom: 6em;
`;

const VocabContainer = styled.div`
border-radius: var(--round);
background-color: var(--clr-white);
box-shadow: var(--lg-shadow);
display: flex;
flex-direction: column;
align-items: center;
padding: 2em;
text-align: center;

& ul {
  display: grid;
  gap: 1.5em;
  padding-left: 0;
}
`;

function EditDeckPage({
  deckData,
  onUpdateCard,
}: {
  deckData: FlashcardSetData[];
  onUpdateCard: (cardId: string, updatedCardData: CardContentType, cardNumber: number) => void;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin(
    loginState: boolean | ((prevState: boolean) => boolean)
  ) {
    setIsLoggedIn(loginState);
  }


  return (
    <>
      <EditDeckContainer>
        {isLoggedIn && <LoginModal onSetLogin={handleLogin} />}
        {!isLoggedIn && (
          <>
            <h1>デック編集</h1>
            <VocabContainer>
              {deckData.map((deck, id) => (
                <ul key={id}>
                  <h2>Set {deck.setNumber}</h2>
                  <EditFlashcard
                    key={id}
                    cards={deck.cards}
                    onUpdateCard={onUpdateCard}
                  />
                </ul>
              ))}
            </VocabContainer>
          </>
        )}
      </EditDeckContainer>
    </>
  );
}

export default EditDeckPage;
