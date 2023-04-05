import React from "react";
import FlashcardScreen from "../../components/FlashcardScreen";
import { FlashcardDeckType } from "../../interfaces";

function SetOne({ deckData }: { deckData: FlashcardDeckType }) {
  return <FlashcardScreen deckData={deckData} />;
}

export default SetOne;
