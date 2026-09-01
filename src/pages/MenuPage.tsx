import { Link } from "react-router-dom";
import type { FlashcardSet } from "@/types";

type MenuPageProps = {
  decks: FlashcardSet[];
  reviewCount: number;
};

function MenuPage({ decks, reviewCount }: MenuPageProps) {
  const totalCards = decks.reduce((total, deck) => total + deck.cards.length, 0);

  return (
    <section className="page-shell content-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Choose your practice</span>
          <h1>今日はどこから始める？</h1>
          <p>好きなセットを選んで、自分のペースで練習しよう。</p>
        </div>
        <Link className="review-summary" to="/revise">
          <span className="review-summary-icon" aria-hidden="true">↻</span>
          <span>
            <small>復習リスト</small>
            <strong>{reviewCount} 枚</strong>
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <Link className="all-cards-panel" to="/all-cards">
        <span>
          <small>FULL DECK</small>
          <strong>全部のカードをまとめて練習</strong>
          <span>{totalCards}枚のカード</span>
        </span>
        <span className="round-arrow" aria-hidden="true">→</span>
      </Link>

      <div className="deck-grid">
        {decks.map((deck, index) => (
          <Link className="deck-card" key={deck.id} to={`/set-${index}`}>
            <span className="deck-index">{String(deck.setNumber).padStart(2, "0")}</span>
            <span className="deck-card-copy">
              <small>LESSON SET</small>
              <strong>セット {deck.setNumber}</strong>
              <span>{deck.cards.length}枚のカード</span>
            </span>
            <span className="deck-card-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default MenuPage;
