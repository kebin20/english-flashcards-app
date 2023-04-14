import React from 'react';
import styled from 'styled-components';
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

function FlashcardItem(props: any) {
  console.log(props);

  return (
    <>
      <StyledEditCardContainer>WIP</StyledEditCardContainer>
    </>
  );
}

export default FlashcardItem;

// State for the inputs
// const [cardText, setCardText] = useState(
//   props.deckCards.map((card: CardsContentType) => ({
//     fuText: card.furigana,
//     enText: card.english,
//     jpText: card.japanese,
//   }))
// );

// const handleInputChange = (index: number, field: string, value: string) => {
//   const newCardText = [...cardText];
//   newCardText[index][field] = value;
//   setCardText(newCardText);
// };

{
  /* {props.deckCards.map((card: CardsContentType, index: number) => (
        <StyledFlashcardContainer key={card.id}>
          <span>{card.cardNumber}.</span>
          <Editable
            text={card.japanese}
            placeholder={card.japanese}
            type="input"
          >
            <input
              type="text"
              name="japanese input"
              placeholder=""
              value={cardText[index].jpText}
              onChange={(e) =>
                handleInputChange(index, 'jpText', e.target.value)
              }
            />
          </Editable>
          <Editable
            text={card.furigana}
            placeholder={card.furigana}
            type="input"
          >
            <input
              type="text"
              name="furigana input"
              placeholder={card.furigana}
              value={cardText[index].fuText}
              onChange={(e) =>
                handleInputChange(index, 'fuText', e.target.value)
              }
            />
          </Editable>
          <Editable
            text={card.english}
            placeholder={card.japanese}
            type="input"
          >
            <input
              type="text"
              name="task"
              placeholder={card.english}
              value={cardText[index].enText}
              onChange={(e) =>
                handleInputChange(index, 'enText', e.target.value)
              }
            />
          </Editable>
          <button>T</button>
        </StyledFlashcardContainer>
      ))} */
}
