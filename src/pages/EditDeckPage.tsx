import { useMemo, useState } from "react";
import type { DeckSource, Flashcard, FlashcardSet } from "@/types";

type EditDeckPageProps = {
  decks: FlashcardSet[];
  onReset: () => void;
  onUpdateCard: (cardId: string, card: Flashcard) => void;
  source: DeckSource;
};

const sourceLabels: Record<DeckSource, string> = {
  fallback: "内蔵データ",
  local: "このブラウザで編集済み",
  remote: "オンライン単語帳",
};

function EditDeckPage({ decks, onReset, onUpdateCard, source }: EditDeckPageProps) {
  const [query, setQuery] = useState("");
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);

  const visibleDecks = useMemo(() => {
    const normalisedQuery = query.trim().toLocaleLowerCase();
    if (!normalisedQuery) return decks;

    return decks
      .map((deck) => ({
        ...deck,
        cards: deck.cards.filter((card) =>
          [card.cardNumber.toString(), card.english, card.furigana, card.japanese]
            .join(" ")
            .toLocaleLowerCase()
            .includes(normalisedQuery),
        ),
      }))
      .filter((deck) => deck.cards.length > 0);
  }, [decks, query]);

  const updateField = (card: Flashcard, field: keyof Flashcard, value: string) => {
    onUpdateCard(card.id, { ...card, [field]: value });
  };

  const confirmReset = () => {
    onReset();
    setIsConfirmingReset(false);
  };

  return (
    <section className="page-shell content-page edit-page">
      <div className="page-heading edit-heading">
        <div>
          <span className="eyebrow">Personalise your deck</span>
          <h1>カードを編集</h1>
          <p>変更はこのブラウザだけに自動保存されます。共有データが書き換わることはありません。</p>
        </div>
        <span className={`source-badge source-${source}`}>{sourceLabels[source]}</span>
      </div>

      <div className="edit-toolbar">
        <label className="search-field">
          <span className="sr-only">カードを検索</span>
          <span aria-hidden="true">⌕</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="英語・日本語・カード番号で検索"
            type="search"
            value={query}
          />
        </label>
        {!isConfirmingReset ? (
          <button className="text-button danger-text" onClick={() => setIsConfirmingReset(true)} type="button">
            編集をすべてリセット
          </button>
        ) : (
          <div className="reset-confirmation" role="alert">
            <span>本当に元に戻しますか？</span>
            <button onClick={confirmReset} type="button">戻す</button>
            <button onClick={() => setIsConfirmingReset(false)} type="button">キャンセル</button>
          </div>
        )}
      </div>

      <div className="edit-decks">
        {visibleDecks.map((deck) => (
          <details className="edit-set" key={deck.id} open={query.length > 0 || deck.setNumber === 1}>
            <summary>
              <span>セット {deck.setNumber}</span>
              <small>{deck.cards.length}枚</small>
            </summary>
            <div className="edit-card-list">
              {deck.cards.map((card) => (
                <fieldset className="edit-card" key={card.id}>
                  <legend>カード {card.cardNumber}</legend>
                  <label>
                    <span>読み方</span>
                    <input
                      onChange={(event) => updateField(card, "furigana", event.target.value)}
                      value={card.furigana}
                    />
                  </label>
                  <label>
                    <span>英語</span>
                    <input
                      lang="en"
                      onChange={(event) => updateField(card, "english", event.target.value)}
                      value={card.english}
                    />
                  </label>
                  <label>
                    <span>日本語</span>
                    <input
                      onChange={(event) => updateField(card, "japanese", event.target.value)}
                      value={card.japanese}
                    />
                  </label>
                </fieldset>
              ))}
            </div>
          </details>
        ))}
        {visibleDecks.length === 0 && (
          <div className="empty-state compact-empty">
            <h2>カードが見つかりません</h2>
            <p>別のキーワードを試してください。</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default EditDeckPage;
