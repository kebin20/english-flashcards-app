import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { reconcileStoredCards } from "@/hooks/useStudyDeck";
import StudyPage from "@/pages/StudyPage";
import type { Flashcard } from "@/types";

const cards: Flashcard[] = [
  {
    id: "card-1",
    cardNumber: 1,
    english: "Hello",
    furigana: "ハロー",
    japanese: "こんにちは。",
  },
  {
    id: "card-2",
    cardNumber: 2,
    english: "Good morning.",
    furigana: "グッド モーニング",
    japanese: "おはようございます。",
  },
];

beforeEach(() => {
  window.localStorage.clear();
});

describe("stored study progress", () => {
  it("preserves an empty completed deck", () => {
    expect(reconcileStoredCards([], cards)).toEqual([]);
  });

  it("reconciles old saved IDs by card number", () => {
    const oldCard = { ...cards[1], id: "old-generated-id" };
    expect(reconcileStoredCards([oldCard], cards)).toEqual([cards[1]]);
  });
});

describe("StudyPage", () => {
  it("flips cards and moves a difficult card into review", () => {
    const onNeedsReview = vi.fn();
    render(
      <MemoryRouter>
        <StudyPage
          cards={cards}
          eyebrow="セット 1"
          onNeedsReview={onNeedsReview}
          storageKey="test-deck"
          title="セット 1 を練習"
        />
      </MemoryRouter>,
    );

    const flashcard = screen.getByRole("button", { name: /カード 1。英語を見る/ });
    fireEvent.click(flashcard);
    expect(flashcard.getAttribute("aria-pressed")).toBe("true");

    fireEvent.click(screen.getByRole("button", { name: /あとでもう一度/ }));
    expect(onNeedsReview).toHaveBeenCalledWith(cards[0]);
    expect(screen.getByRole("button", { name: /カード 2。英語を見る/ })).toBeTruthy();
    expect(JSON.parse(window.localStorage.getItem("test-deck") ?? "null")).toEqual([
      cards[1],
    ]);
  });

  it("keeps a completed set complete after reload", () => {
    window.localStorage.setItem("completed-deck", "[]");
    render(
      <MemoryRouter>
        <StudyPage
          cards={cards}
          eyebrow="セット 1"
          storageKey="completed-deck"
          title="セット 1 を練習"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("このセットは完了！")).toBeTruthy();
  });
});
