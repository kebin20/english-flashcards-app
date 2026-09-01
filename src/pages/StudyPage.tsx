import { Link } from "react-router-dom";
import Flashcard from "@/components/Flashcard";
import { useStudyDeck } from "@/hooks/useStudyDeck";
import type { Flashcard as FlashcardType } from "@/types";

type StudyPageProps = {
  cards: FlashcardType[];
  emptyDescription?: string;
  emptyTitle?: string;
  eyebrow: string;
  onKnown?: (card: FlashcardType) => void;
  onNeedsReview?: (card: FlashcardType) => void;
  storageKey: string;
  title: string;
  variant?: "practice" | "review";
};

function StudyPage({
  cards: incomingCards,
  emptyDescription = "このセットのカードをすべて練習しました。リセットすれば、もう一度はじめられます。",
  emptyTitle = "このセットは完了！",
  eyebrow,
  onKnown,
  onNeedsReview,
  storageKey,
  title,
  variant = "practice",
}: StudyPageProps) {
  const {
    cardIndex,
    cards,
    completedCount,
    currentCard,
    flipCard,
    goBack,
    goForward,
    isFlipped,
    markForReview,
    markKnown,
    reset,
    shuffle,
  } = useStudyDeck(incomingCards, storageKey, onKnown, onNeedsReview);

  const totalCards = incomingCards.length;
  const progress = totalCards === 0 ? 0 : (completedCount / totalCards) * 100;

  return (
    <section className="page-shell study-page">
      <div className="study-heading">
        <Link className="back-link" to="/menu">
          <span aria-hidden="true">←</span> セット一覧
        </Link>
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
        </div>
        {currentCard && (
          <div className="progress-copy" aria-live="polite">
            <strong>{cardIndex + 1}</strong>
            <span>/ {cards.length}</span>
          </div>
        )}
      </div>

      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      {currentCard ? (
        <>
          <div className="study-stage">
            <button
              aria-label="前のカード"
              className="arrow-button"
              onClick={goBack}
              type="button"
            >
              ←
            </button>
            <Flashcard card={currentCard} isFlipped={isFlipped} onFlip={flipCard} />
            <button
              aria-label="次のカード"
              className="arrow-button"
              onClick={goForward}
              type="button"
            >
              →
            </button>
          </div>

          <p className="keyboard-hint">← → で移動 ・ スペースでカードをめくる</p>

          <div className="study-actions">
            {variant === "practice" && (
              <button className="button button-review" onClick={markForReview} type="button">
                <span aria-hidden="true">↻</span>
                あとでもう一度
              </button>
            )}
            <button className="button button-known" onClick={markKnown} type="button">
              <span aria-hidden="true">✓</span>
              覚えた！
            </button>
          </div>

          <div className="study-tools">
            <button onClick={shuffle} type="button">カードをシャッフル</button>
            {variant === "practice" && <button onClick={reset} type="button">進捗をリセット</button>}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <span className="completion-mark" aria-hidden="true">✓</span>
          <h2>{emptyTitle}</h2>
          <p>{emptyDescription}</p>
          <div className="empty-actions">
            <Link className="button button-primary" to="/menu">ほかのセットへ</Link>
            {variant === "practice" && incomingCards.length > 0 && (
              <button className="button button-quiet" onClick={reset} type="button">もう一度</button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default StudyPage;
