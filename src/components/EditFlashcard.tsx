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

  @media only screen and (max-width: 600px) {
    gap:0;
  }
`;

function EditFlashcard({ cards }: { cards: CardContentType[] }) {
  const cardContent = cards.map((card) => ({
    id: card.id,
    cardNumber: card.cardNumber,
    fuText: card.furigana,
    enText: card.english,
    jpText: card.japanese,
  }));

  const [cardText, setCardText] = useState(cardContent);
  console.log(cardText[0]);

  const [isEditing, setIsEditing] = useState(false);

  function handleOnEdit() {
    setIsEditing(true);
  }

  function handleOnSubmitFurigana(nextValue: string, cardId: string) {
    setCardText((prevCardText) => {
      const updatedCardText = prevCardText.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            fuText: nextValue,
          };
        }
        return card;
      });
      return updatedCardText;
    });
    setIsEditing(false);
  }

  function handleOnSubmitEnglish(nextValue: any) {
    setIsEditing(false);
    // setCardText(nextValue);
  }

  function handleOnSubmitJapanese(nextValue: any) {
    setIsEditing(false);
    // setCardText(nextValue);
  }

  function handleOnCancel() {
    setIsEditing(false);
  }

  return (
    <>
      {cardContent.map((card: any, index: number) => (
        <StyledEditCardContainer key={card.id}>
          <span>{card.cardNumber}.</span>
          <Editable
            defaultValue={card.fuText}
            isPreviewFocusable={!isEditing}
            onEdit={handleOnEdit}
            onSubmit={(nextValue: string) =>
              handleOnSubmitFurigana(nextValue, card.id)
            }
            onCancel={handleOnCancel}
          >
            <EditablePreview
              sx={{
                display: isEditing ? 'none' : 'initial',
              }}
            ></EditablePreview>
            <EditableInput />
          </Editable>
          <Editable
            defaultValue={card.enText}
            isPreviewFocusable={!isEditing}
            onEdit={handleOnEdit}
            onSubmit={handleOnSubmitEnglish}
            onCancel={handleOnCancel}
          >
            <EditablePreview
              sx={{
                display: isEditing ? 'none' : 'initial',
              }}
            ></EditablePreview>
            <EditableInput />
          </Editable>
          <Editable
            defaultValue={card.jpText}
            isPreviewFocusable={!isEditing}
            onEdit={handleOnEdit}
            onSubmit={handleOnSubmitJapanese}
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
      ))}
    </>
  );
}

export default EditFlashcard;
