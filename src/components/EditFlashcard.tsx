import React, { useState } from 'react';
import styled from 'styled-components';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/editable';
import { CardContentType } from '../interfaces';

const StyledEditCardContainer = styled.div`
  background-color: var(--clr-light);
  border-radius: var(--round);
  box-shadow: var(--lg-shadow);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 3em;
  padding: 1.5em;

  & p {
    border-bottom: 0.5px solid lightgrey;
  }

  & button {
    background: transparent;
    border: transparent;
  }
`;

function EditFlashcard({ cards }: { cards: CardContentType[] }) {
  const cardContent = cards.map((card) => ({
    fuText: card.furigana,
    enText: card.english,
    jpText: card.japanese,
  }));

  console.log(cardContent)

  const [cardText, setCardText] = useState();

  // const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  function handleOnEdit() {
    setIsEditing(true);
  }

  function handleOnSubmit(nextValue: string) {
    setIsEditing(false);
    // setValue(nextValue);
  }

  function handleOnCancel() {
    setIsEditing(false);
  }

  return (
    <>
      {/* {props.deckCards.map((card: CardContentType, index: number) => ( */}
      <StyledEditCardContainer>
        <Editable
          defaultValue="Type here"
          isPreviewFocusable={!isEditing}
          onEdit={handleOnEdit}
          onSubmit={handleOnSubmit}
          onCancel={handleOnCancel}
        >
          <EditablePreview
            sx={{
              display: isEditing ? 'none' : 'initial',
            }}
          ></EditablePreview>
          <EditableInput />
        </Editable>
      </StyledEditCardContainer>
      {/* ))} */}
    </>
  );
}

export default EditFlashcard;
