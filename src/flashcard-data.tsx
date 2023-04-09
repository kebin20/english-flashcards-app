import { nanoid } from 'nanoid';

const decks = [
  {
    id: nanoid(),
    setNumber: 1,
    cards: [
      {
        id: nanoid(),
        cardNumber: 1,
        furigana: ' ハロー',
        english: 'Hello',
        japanese: 'こんにちは。',
      },
      {
        id: nanoid(),
        cardNumber: 2,
        furigana: 'ハウ　アー　ユー',
        english: 'How are you?',
        japanese: '元気ですか。',
      },
      {
        id: nanoid(),
        cardNumber: 3,
        furigana: 'アイ　アム　グッドゥ',
        english: 'I am good.',
        japanese: '私は元気です。',
      },
      {
        id: nanoid(),
        cardNumber: 4,
        furigana: 'アイ　アム　オウケイ',
        english: 'I am OK.',
        japanese: '私はまあまあです。',
      },
      {
        id: nanoid(),
        cardNumber: 5,
        furigana: 'アイ　アム　タイアードゥ',
        english: 'I am tired.',
        japanese: '私は疲れています。',
      },
      {
        id: nanoid(),
        cardNumber: 6,
        furigana: 'ハウ　メニイ　アプルズ　ドゥー　ユー　ヒャブ',
        english: '  How many apples do you have?',
        japanese: '  あなたはリンゴを何個持っていますか。',
      },
      {
        id: nanoid(),
        cardNumber: 7,
        furigana: 'アイ　ヒャブ　スリー',
        english: 'I have three.',
        japanese: '私は３個持っています。',
      },
      {
        id: nanoid(),
        cardNumber: 8,
        furigana: 'ドゥー　ユー　ライク　レッドゥ',
        english: 'Do you like red?',
        japanese: 'あなたは赤色が好きですか。',
      },
      {
        id: nanoid(),
        cardNumber: 9,
        furigana: 'イエス　アイ　ドゥ',
        english: 'Yes, I do.',
        japanese: 'はい、好きです。',
      },
      {
        id: nanoid(),
        cardNumber: 10,
        furigana: 'ノー　アイ　ドントゥ',
        english: "No, I don't.",
        japanese: 'いいえ、好きで はありません。',
      },
    ],
  },
];

export default decks;
