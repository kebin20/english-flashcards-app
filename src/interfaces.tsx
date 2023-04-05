import React, { ReactNode } from 'react';
import { To } from 'react-router-dom';

export interface ArrowButtonType {
  onClick: React.MouseEventHandler<SVGSVGElement>;
}

export interface ButtonType {
  className?: string | undefined;
  to?: To;
  children?: ReactNode;
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ContainerType {
  children?: ReactNode;
}

export interface FlashcardType {
  isFlipped: boolean;
  onFlip: () => void;
  currentCard: any;
}

export interface FlashcardDeckType {
  deckData: {
    id: string;
    setNumber: number;
    cards: {
      id: string;
      cardNumber: number;
      furigana: string;
      english: string;
      japanese: string;
    }[];
  }[];
}
