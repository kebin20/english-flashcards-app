import { nanoid } from 'nanoid';

export const decks = [
  {
    id: nanoid(),
    set: 'one',
    card: [
      {
        id: 1,
        furigana: ' ハロー',
        english: 'Hello',
        japanese: 'こんにちは。',
      },
      {
        id: 2,
        furigana: ' ハロー',
        english: 'Hello',
        japanese: 'こんにちは。',
      },
    ],
  },
];
