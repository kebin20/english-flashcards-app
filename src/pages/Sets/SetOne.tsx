import React from "react";
import FlashcardScreen from "../../components/FlashcardScreen";
import { FlashcardDeckData, CardsContentType } from "../../interfaces";

function SetOne({
  deckData,
  onPassVocabDataUp,
  vocabData,
}: {
  deckData: FlashcardDeckData;
  onPassVocabDataUp: (
    newVocabData: React.SetStateAction<CardsContentType[]>
  ) => void;
  vocabData: CardsContentType[];
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
