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
        furigana: 'ハウ　アー　ユー',
        english: 'How are you?',
        japanese: '元気ですか。',
      },
      {
        id: 3,
        furigana: 'アイ　アム　グッドゥ',
        english: 'I am good.',
        japanese: '私は元気です。',
      },
      {
        id: 4,
        furigana: 'アイ　アム　オウケイ',
        english: 'I am OK.',
        japanese: '私はまあまあです。',
      },
      {
        id: 5,
        furigana: 'アイ　アム　タイアードゥ',
        english: 'I am tired.',
        japanese: '私は疲れています。',
      },
    ],
  },
];
