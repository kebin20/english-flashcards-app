import { useMemo } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useDecks } from "@/hooks/useDecks";
import { useReviewQueue } from "@/hooks/useReviewQueue";
import { STORAGE_KEYS } from "@/lib/storage";
import EditDeckPage from "@/pages/EditDeckPage";
import MenuPage from "@/pages/MenuPage";
import StudyPage from "@/pages/StudyPage";
import WelcomePage from "@/pages/WelcomePage";

function App() {
  const { decks, isLoading, notice, resetDecks, source, updateCard } = useDecks();
  const { addReviewCard, removeReviewCard, reviewCards } = useReviewQueue();
  const allCards = useMemo(() => decks.flatMap((deck) => deck.cards), [decks]);

  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">
        メインコンテンツへ移動
      </a>
      <Navbar reviewCount={reviewCards.length} />
      {notice && <div className="data-notice">{notice}</div>}
      <main id="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <WelcomePage
                isLoading={isLoading}
                setCount={decks.length}
                totalCards={allCards.length}
              />
            }
          />
          <Route
            path="/menu"
            element={<MenuPage decks={decks} reviewCount={reviewCards.length} />}
          />
          <Route
            path="/all-cards"
            element={
              <StudyPage
                cards={allCards}
                eyebrow="すべてのセット"
                onNeedsReview={addReviewCard}
                storageKey="allCards"
                title="全カード練習"
              />
            }
          />
          {decks.map((deck, index) => (
            <Route
              key={deck.id}
              path={`/set-${index}`}
              element={
                <StudyPage
                  cards={deck.cards}
                  eyebrow={`セット ${deck.setNumber}`}
                  onNeedsReview={addReviewCard}
                  storageKey={`cardDeckSet${deck.setNumber}`}
                  title={`セット ${deck.setNumber} を練習`}
                />
              }
            />
          ))}
          <Route
            path="/revise"
            element={
              <StudyPage
                cards={reviewCards}
                emptyDescription="練習中に「あとでもう一度」を選んだカードがここに集まります。"
                emptyTitle="復習カードはありません"
                eyebrow="マイリスト"
                onKnown={removeReviewCard}
                storageKey={STORAGE_KEYS.reviewQueue}
                title="もう一度練習"
                variant="review"
              />
            }
          />
          <Route
            path="/edit-deck"
            element={
              <EditDeckPage
                decks={decks}
                onReset={resetDecks}
                onUpdateCard={updateCard}
                source={source}
              />
            }
          />
          <Route
            path="*"
            element={
              <section className="page-shell centered-page">
                <div className="empty-state">
                  <span className="eyebrow">404</span>
                  <h1>ページが見つかりません</h1>
                  <p>リンクが古いか、URLが間違っているようです。</p>
                  <Link className="button button-primary" to="/">
                    ホームへ戻る
                  </Link>
                </div>
              </section>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
