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

function EditFlashcard({
  cards,
  onUpdateCard,
}: {
  cards: CardContentType[];
  onUpdateCard: (cardId: string, updatedCardData: CardContentType, cardNumber: number) => void;
}) {
  const cardContent = cards.map((card) => ({
    id: card.id,
    cardNumber: card.cardNumber,
    furigana: card.furigana,
    english: card.english,
    japanese: card.japanese,
  }));

  const [cardText, setCardText] = useState(cardContent);
  const [isEditing, setIsEditing] = useState(false);

  function handleSaveChanges(updatedCardData: CardContentType, cardId: string, cardNumber: number) {
    onUpdateCard(cardId, updatedCardData, cardNumber);
    setIsEditing(false);
  }

  function handleUpdateCardText(
    cardId: string,
    field: string,
    value: string,
    cardNumber: number
  ) {
    setCardText((prevCardText) => {
      const updatedCardText = prevCardText.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            [field]: value,
          };
        }
        return card;
      });
      return updatedCardText;
    });

    const updatedCardData = {
      id: cardId,
      cardNumber: cardNumber,
      japanese:
        field === 'japanese'
          ? value
          : cardText.find((card) => card.id === cardId)?.japanese || '',
      english:
        field === 'english'
          ? value
          : cardText.find((card) => card.id === cardId)?.english || '',
      furigana:
        field === 'furigana'
          ? value
          : cardText.find((card) => card.id === cardId)?.furigana || '',
    };
    console.log(updatedCardData);
    handleSaveChanges(updatedCardData, cardId, cardNumber);
  }

  function handleOnSubmitFurigana(
    nextValue: string,
    cardId: string,
    cardNumber: number
  ) {
    handleUpdateCardText(cardId, 'furigana', nextValue, cardNumber);
  }

  function handleOnSubmitEnglish(
    nextValue: string,
    cardId: string,
    cardNumber: number
  ) {
    handleUpdateCardText(cardId, 'english', nextValue, cardNumber);
  }

  function handleOnSubmitJapanese(
    nextValue: string,
    cardId: string,
    cardNumber: number
  ) {
    handleUpdateCardText(cardId, 'japanese', nextValue, cardNumber);
  }

  // function handleOnSubmitFurigana(nextValue: string, cardId: string) {
  //   setCardText((prevCardText) => {
  //     const updatedCardText = prevCardText.map((card) => {
  //       if (card.id === cardId) {
  //         return {
  //           ...card,
  //           furigana: nextValue,
  //         };
  //       }
  //       return card;
  //     });
  //     return updatedCardText;
  //   });
  //   setIsEditing(false);
  // }

  // function handleOnSubmitEnglish(nextValue: string, cardId: string) {
  //   setCardText((prevCardText) => {
  //     const updatedCardText = prevCardText.map((card) => {
  //       if (card.id === cardId) {
  //         return {
  //           ...card,
  //           english: nextValue,
  //         };
  //       }
  //       return card;
  //     });
  //     return updatedCardText;
  //   });
  //   setIsEditing(false);
  // }

  // function handleOnSubmitJapanese(nextValue: string, cardId: string) {
  //   setCardText((prevCardText) => {
  //     const updatedCardText = prevCardText.map((card) => {
  //       if (card.id === cardId) {
  //         return {
  //           ...card,
  //           japanese: nextValue,
  //         };
  //       }
  //       return card;
  //     });
  //     return updatedCardText;
  //   });
  //   setIsEditing(false);
  // }

  function handleOnEdit() {
    setIsEditing(true);
  }

  function handleOnCancel() {
    setIsEditing(false);
  }

  return (
    <>
      {cardContent.map((card) => (
        <StyledEditCardContainer key={card.id}>
          <span>{card.cardNumber}.</span>
          <Editable
            defaultValue={card.furigana}
            isPreviewFocusable={!isEditing}
            onEdit={handleOnEdit}
            onSubmit={(nextValue: string) =>
              handleOnSubmitFurigana(nextValue, card.id, card.cardNumber)
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
            defaultValue={card.english}
            isPreviewFocusable={!isEditing}
            onEdit={handleOnEdit}
            onSubmit={(nextValue: string) =>
              handleOnSubmitEnglish(nextValue, card.id, card.cardNumber)
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
            defaultValue={card.japanese}
            isPreviewFocusable={!isEditing}
            onEdit={handleOnEdit}
            onSubmit={(nextValue: string) =>
              handleOnSubmitJapanese(nextValue, card.id, card.cardNumber)
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
        </StyledEditCardContainer>
      ))}
    </>
  );
}

export default EditFlashcard;
