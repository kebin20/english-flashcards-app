import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import WelcomePage from './pages/WelcomePage';
import MenuPage from './pages/MenuPage';
import EditDeckPage from './pages/EditDeckPage';
import RevisePage from './pages/RevisePage';
import AllCardsPage from './pages/AllCardsPage';
import SetOne from './pages/Sets/SetOne';

import deckData from './flashcard-data';
import { CardsContentType, DecksType } from './interfaces';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCf3250l4lmfX3pzb7VY6Jx1NKeu7DgEYg',
  authDomain: 'english-flashcards-app-962bb.firebaseapp.com',
  databaseURL:
    'https://english-flashcards-app-962bb-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'english-flashcards-app-962bb',
  storageBucket: 'english-flashcards-app-962bb.appspot.com',
  messagingSenderId: '68752169253',
  appId: '1:68752169253:web:0fe8e45741e1e121b362cc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const [deck, setDeck] = useState([]);
  const [allCards, setAllCards] = useState<CardsContentType[]>([]);
  const [vocabData, setVocabData] = useState<CardsContentType[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  /* Upload initial data to Firebase */
  function writeFlashcardData(decks: DecksType) {
    const db = getDatabase();
    set(ref(db, 'flashcards'), {
      decks,
    });
  }

  /* Fetching flashcard from Firebase*/
  const fetchFlashcardHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://english-flashcards-app-962bb-default-rtdb.asia-southeast1.firebasedatabase.app/flashcards.json'
      );
      if (!response.ok) {
        throw new Error('An error has occurred');
      }

      const data = await response.json();
      setDeck(data.decks);

      // Obtain all of the cards arrays, join them and flatten it
      const decksArr = [];
      for (let i = 0; i < data.decks.length; i++) {
        decksArr.push(data.decks[i].cards);
      }
      const flattenedDecksArr = decksArr.flat();
      setAllCards(flattenedDecksArr);
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (deck.length === 0) {
      writeFlashcardData(deckData);
      fetchFlashcardHandler();
    }
  }, [deck.length]);

  /* Fetching vocab function (USING localStorage)*/
  useEffect(() => {
    const storedVocabs = JSON.parse(localStorage.getItem('storedVocabs')!);
    if (storedVocabs) {
      setVocabData(storedVocabs);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('storedVocabs', JSON.stringify(vocabData));
  }, [vocabData]);

  // Revised vocab data flow
  function handleVocabData(
    newVocabData: React.SetStateAction<CardsContentType[]>
  ) {
    setVocabData(newVocabData);
  }

  function handleRevisedVocabData(
    newRevisedVocabData: React.SetStateAction<CardsContentType[]>
  ) {
    setVocabData(newRevisedVocabData);
  }

  // /* Error Handling */

  let content = <p>Data not found</p>;

  if (deck.length > 0) {
    content = (
      <SetOne
        onPassVocabDataUp={handleVocabData}
        deckData={deck[0]}
        vocabData={vocabData}
      />
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <HashRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route
            path="/all-cards"
            element={
              <AllCardsPage
                onPassVocabDataUp={handleVocabData}
                allCards={allCards}
                vocabData={vocabData}
              />
            }
          />
          <Route path="/set-one" element={content} />
          <Route path="/edit-deck" element={<EditDeckPage />} />
          <Route
            path="/revise"
            element={
              <RevisePage
                vocabData={vocabData}
                onPassRevisedVocabDataUp={handleRevisedVocabData}
              />
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
