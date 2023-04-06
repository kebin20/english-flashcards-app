import React from 'react';
import FlashcardScreen from '../../components/FlashcardScreen';
import { CardContentType, FlashcardDeckType } from '../../interfaces';

function SetOne({
  deckData,
  onPassVocabDataUp,
}: {
  deckData: FlashcardDeckType;
  onPassVocabDataUp: CardContentType;
}) {
  return (
    <FlashcardScreen
      onPassVocabDataUp={onPassVocabDataUp}
      deckData={deckData}
    />
  );
}

export default SetOne;
