import React from 'react';
import FlashcardScreen from '../../components/FlashcardScreen';
import { FlashcardDeckType } from '../../interfaces';

function SetOne({
  deckData,
  onPassVocabDataUp,
}: {
  deckData: FlashcardDeckType;
  onPassVocabDataUp: (newVocabData: React.SetStateAction<never[]>) => void;
}) {
  return (
    <FlashcardScreen
      onPassVocabDataUp={onPassVocabDataUp}
      deckData={deckData}
    />
  );
}

export default SetOne;
