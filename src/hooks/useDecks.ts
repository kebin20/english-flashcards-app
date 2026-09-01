import { useCallback, useEffect, useState } from "react";
import { fetchRemoteDecks, safeFallbackDecks } from "@/lib/decks";
import { readStoredDecks, removeStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";
import type { DeckSource, Flashcard, FlashcardSet } from "@/types";

const localDecks = readStoredDecks(STORAGE_KEYS.customDecks);

export function useDecks() {
  const [decks, setDecks] = useState<FlashcardSet[]>(localDecks ?? safeFallbackDecks);
  const [baseDecks, setBaseDecks] = useState<FlashcardSet[]>(safeFallbackDecks);
  const [source, setSource] = useState<DeckSource>(localDecks ? "local" : "fallback");
  const [isLoading, setIsLoading] = useState(!localDecks);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetchRemoteDecks(controller.signal)
      .then((remoteDecks) => {
        setBaseDecks(remoteDecks);
        if (!localDecks) {
          setDecks(remoteDecks);
          setSource("remote");
        }
        setNotice("");
        setIsLoading(false);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (!localDecks) {
          setNotice("オンラインの単語帳を読み込めなかったため、内蔵データを表示しています。");
        }
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  const updateCard = useCallback((cardId: string, updatedCard: Flashcard) => {
    setDecks((currentDecks) => {
      const updatedDecks = currentDecks.map((deck) => ({
        ...deck,
        cards: deck.cards.map((card) => (card.id === cardId ? updatedCard : card)),
      }));
      writeStorage(STORAGE_KEYS.customDecks, updatedDecks);
      return updatedDecks;
    });
    setSource("local");
  }, []);

  const resetDecks = useCallback(() => {
    removeStorage(STORAGE_KEYS.customDecks);
    setDecks(baseDecks);
    setSource(baseDecks === safeFallbackDecks ? "fallback" : "remote");
  }, [baseDecks]);

  return { decks, isLoading, notice, resetDecks, source, updateCard };
}
