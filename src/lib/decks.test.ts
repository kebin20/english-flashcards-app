import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchRemoteDecks, isFlashcardSetArray, normaliseDecks } from "@/lib/decks";
import type { FlashcardSet } from "@/types";

const deck: FlashcardSet = {
  id: "set-1",
  setNumber: 1,
  cards: [
    {
      id: "card-1",
      cardNumber: 1,
      english: " Hello ",
      furigana: " ハロー ",
      japanese: " こんにちは。 ",
    },
  ],
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("deck validation", () => {
  it("accepts a complete flashcard deck", () => {
    expect(isFlashcardSetArray([deck])).toBe(true);
  });

  it("rejects partial data instead of crashing the app", () => {
    expect(isFlashcardSetArray([{ id: "set-1", setNumber: 1 }])).toBe(false);
  });

  it("trims accidental whitespace in card content", () => {
    const [normalisedDeck] = normaliseDecks([deck]);
    expect(normalisedDeck.cards[0]?.english).toBe("Hello");
    expect(normalisedDeck.cards[0]?.japanese).toBe("こんにちは。");
  });
});

describe("fetchRemoteDecks", () => {
  it("returns validated deck data", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ decks: [deck] }),
        ok: true,
      }),
    );

    await expect(fetchRemoteDecks()).resolves.toEqual(normaliseDecks([deck]));
  });

  it("rejects an invalid service response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ decks: "not-a-deck" }),
        ok: true,
      }),
    );

    await expect(fetchRemoteDecks()).rejects.toThrow("unexpected response");
  });
});
