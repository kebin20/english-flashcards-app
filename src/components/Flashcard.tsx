import type { Flashcard as FlashcardType } from "@/types";

type FlashcardProps = {
  card: FlashcardType;
  isFlipped: boolean;
  onFlip: () => void;
};

function Flashcard({ card, isFlipped, onFlip }: FlashcardProps) {
  return (
    <button
      aria-label={`カード ${card.cardNumber}。${isFlipped ? "日本語を見る" : "英語を見る"}`}
      aria-pressed={isFlipped}
      className={`flashcard${isFlipped ? " is-flipped" : ""}`}
      onClick={onFlip}
      type="button"
    >
      <span className="flashcard-inner">
        <span aria-hidden={isFlipped} className="flashcard-face flashcard-front">
          <span className="card-number">#{card.cardNumber}</span>
          <span className="card-language">日本語</span>
          <strong>{card.japanese}</strong>
          <span className="flip-hint">タップして英語を見る</span>
        </span>
        <span aria-hidden={!isFlipped} className="flashcard-face flashcard-back">
          <span className="card-number">#{card.cardNumber}</span>
          <span className="card-language">English</span>
          <span className="furigana">{card.furigana}</span>
          <strong lang="en">{card.english}</strong>
          <span className="flip-hint">タップして日本語に戻る</span>
        </span>
      </span>
    </button>
  );
}

export default Flashcard;
