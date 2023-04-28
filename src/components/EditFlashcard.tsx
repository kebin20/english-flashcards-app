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
  onUpdateCard: any;
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

  function handleSaveChanges(updatedCardData: CardContentType, cardId: string) {
    onUpdateCard(cardId, updatedCardData);
    setIsEditing(false);
  }


  // function handleUpdateCardText(cardId: string, field: string, value: string) {
  //   setCardText((prevCardText) => {
  //     const updatedCardText = prevCardText.map((card) => {
  //       if (card.id === cardId) {
  //         return {
  //           ...card,
  //           [field]: value,
  //         };
  //       }
  //       return card;
  //     });
  //     return updatedCardText;
  //   });
  
  //   const updatedCardData = {
  //     cardId,
  //     japanese: field === 'japanese' ? value : cardText.find((card) => card.id === cardId)?.japanese || '',
  //     english: field === 'english' ? value : cardText.find((card) => card.id === cardId)?.english || '',
  //     furigana: field === 'furigana' ? value : cardText.find((card) => card.id === cardId)?.furigana || '',
  //   };
  
  //   handleSaveChanges(updatedCardData, cardId);
  // }
  
  // function handleOnSubmitFurigana(nextValue: string, cardId: string) {
  //   handleUpdateCardText(cardId, 'furigana', nextValue);
  // }
  
  // function handleOnSubmitEnglish(nextValue: string, cardId: string) {
  //   handleUpdateCardText(cardId, 'english', nextValue);
  // }
  
  // function handleOnSubmitJapanese(nextValue: string, cardId: string) {
  //   handleUpdateCardText(cardId, 'japanese', nextValue);
  // }

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
            defaultValue={card.english}
            isPreviewFocusable={!isEditing}
            onEdit={handleOnEdit}
            onSubmit={(nextValue: string) =>
              handleOnSubmitEnglish(nextValue, card.id)
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
              handleOnSubmitJapanese(nextValue, card.id)
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
