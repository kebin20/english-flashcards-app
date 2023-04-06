import React from "react";
import FlashcardScreen from "../../components/FlashcardScreen";
import { FlashcardDeckData } from "../../interfaces";

function SetOne({
  deckData,
  onPassVocabDataUp,
  vocabData,
}: {
  deckData: FlashcardDeckData;
  onPassVocabDataUp: (newVocabData: React.SetStateAction<never[]>) => void;
  vocabData: any[];
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
