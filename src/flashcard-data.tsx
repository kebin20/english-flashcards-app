import { initializeApp } from "firebase/app";

import { nanoid } from 'nanoid';

const firebaseConfig = {
  apiKey: "AIzaSyCf3250l4lmfX3pzb7VY6Jx1NKeu7DgEYg",
  authDomain: "english-flashcards-app-962bb.firebaseapp.com",
  databaseURL: "https://english-flashcards-app-962bb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "english-flashcards-app-962bb",
  storageBucket: "english-flashcards-app-962bb.appspot.com",
  messagingSenderId: "68752169253",
  appId: "1:68752169253:web:0fe8e45741e1e121b362cc"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
  {
    id: nanoid(),
    setNumber: 2,
    cards: [
      {
        id: nanoid(),
        cardNumber: 11,
        furigana: 'アイ　ライク　レッドゥ',
        english: 'I like red',
        japanese: '私は赤が好きです。',
      },
      {
        id: nanoid(),
        cardNumber: 12,
        furigana: 'アイ　ドントゥ　ライク　レッド',
        english: "I don't like red.",
        japanese: '私は赤が好きではありません。',
      },
      {
        id: nanoid(),
        cardNumber: 13,
        furigana: '（フ）ワットゥ　スポートゥ　ドゥ　ユー　ライク',
        english: 'What sport do you like?',
        japanese: 'あなたはどんなスポーツが好きですか。',
      },
      {
        id: nanoid(),
        cardNumber: 14,
        furigana: 'アイ　ライク　テニス',
        english: 'I like tennis.',
        japanese: '  私はテニスが好きです。',
      },
      {
        id: nanoid(),
        cardNumber: 15,
        furigana: '（フ）ワッツ　ズィス',
        english: "What's this?",
        japanese: 'これは何ですか。',
      },
      {
        id: nanoid(),
        cardNumber: 16,
        furigana: 'イッツ　ア　バナナ',
        english: "It's a banana.",
        japanese: 'それはバナナです。',
      },
      {
        id: nanoid(),
        cardNumber: 17,
        furigana: 'フー　アー　ユー',
        english: 'Who are you?',
        japanese: 'あなたは誰ですか。',
      },
      {
        id: nanoid(),
        cardNumber: 18,
        furigana: 'アイ　アム　ア　マンキー',
        english: 'I am a monkey.',
        japanese: '私はサルです。',
      },
      {
        id: nanoid(),
        cardNumber: 19,
        furigana: 'アー　ユー　ア　カウ',
        english: 'Are you a cow?',
        japanese: ' あなたは牛ですか。',
      },
      {
        id: nanoid(),
        cardNumber: 20,
        furigana: 'イエス　アイ　アム',
        english: 'Yes, I am.',
        japanese: 'はい、そうです。',
      },
    ],
  },
];

export default decks;
