import React, { useState } from 'react';

import { CardContentType } from '../interfaces';

type FlashcardContextObj = {
  flashcard: CardContentType[];
  goForward: () => void;
  goBack: () => void;
  handleKeyDown: (event: { code: string }) => void;
  vocabLearnt: () => void;
  reviseVocab: () => void;
  reset: () => void;
  flipCard: () => void;
};

export const FlashcardContext = React.createContext<FlashcardContextObj>({
  flashcard: [],
  goForward: () => {},
  goBack: () => {},
  handleKeyDown: (event: { code: string }) => {},
  vocabLearnt: () => {},
  reviseVocab: () => {},
  reset: () => {},
  flipCard: () => {},
});

function FlashcardContextProvider()