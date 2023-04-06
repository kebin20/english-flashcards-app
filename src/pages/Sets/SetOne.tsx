import React from 'react';
import FlashcardScreen from '../../components/FlashcardScreen';
import { FlashcardDeckType } from '../../interfaces';

function SetOne({
  deckData,
  onPassVocabDataUp,
  vocabData,
}: {
  deckData: FlashcardDeckType;
  onPassVocabDataUp: (newVocabData: React.SetStateAction<never[]>) => void;
}) {
  return (
    <FlashcardScreen
      onPassVocabDataUp={onPassVocabDataUp}
      deckData={deckData}
      vocabData={vocabData}
    />
  );
}

export default SetOne;
