import { nanoid } from "nanoid";

const decks = [
  {
    id: nanoid(),
    setNumber: 1,
    card: [
      {
        id: nanoid(),
        cardNumber: 1,
        furigana: " ハロー",
        english: "Hello",
        japanese: "こんにちは。",
      },
      {
        id: nanoid(),
        cardNumber: 2,
        furigana: "ハウ　アー　ユー",
        english: "How are you?",
        japanese: "元気ですか。",
      },
      {
        id: nanoid(),
        cardNumber: 3,
        furigana: "アイ　アム　グッドゥ",
        english: "I am good.",
        japanese: "私は元気です。",
      },
      {
        id: nanoid(),
        cardNumber: 4,
        furigana: "アイ　アム　オウケイ",
        english: "I am OK.",
        japanese: "私はまあまあです。",
      },
      {
        id: nanoid(),
        cardNumber: 5,
        furigana: "アイ　アム　タイアードゥ",
        english: "I am tired.",
        japanese: "私は疲れています。",
      },
      {
        id: nanoid(),
        cardNumber: 6,
        furigana: "ハウ　メニイ　アプルズ　ドゥー　ユー　ヒャブ",
        english: "  How many apples do you have?",
        japanese: "  あなたはリンゴを何個持っていますか。",
      },
    ],
  },
];

export default decks;
