import React, { ReactNode } from "react";
import { To } from "react-router-dom";

export type CardsContentType = {
  id: string;
  cardNumber: number;
  furigana: string;
  english: string;
  japanese: string;
};

export interface ArrowButtonProps {
  onClick: React.MouseEventHandler<SVGSVGElement>;
}

export interface ButtonProps {
  className?: string | undefined;
  to: To;
  children?: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface MainLinkButtonProps extends ButtonProps {
  deckData: {
    id: string;
    setNumber: number;
    cards: CardsContentType[];
  }[];
}

export interface ContainerProps {
  children?: ReactNode;
}

export interface FlashcardDeckData {
  id: string;
  setNumber: number;
  cards: CardsContentType[];
}

export interface FlashcardProps {
  isFlipped?: boolean;
  onFlip?: () => void;
  currentCard: CardsContentType;
}