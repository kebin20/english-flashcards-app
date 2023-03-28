import FlashcardScreen from "../../components/FlashcardScreen";
import { FlashcardType } from "../../interfaces";

function SetOne({ deckData }: { deckData: FlashcardType }) {
  return <FlashcardScreen deckData={deckData} />;
}

export default SetOne;
