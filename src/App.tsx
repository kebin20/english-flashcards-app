import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import WelcomePage from './pages/WelcomePage';
import MenuPage from './pages/MenuPage';
import EditDeckPage from './pages/EditDeckPage';
import RevisePage from './pages/RevisePage';
import AllCardsPage from './pages/AllCardsPage';
import SetOne from './pages/Sets/SetOne';

import deckData from './flashcard-data';
import { CardsContentType } from './interfaces';

// const database = getDatabase(app);

function App() {
  const [deck, setDeck] = useState([]);
  const [allCards, setAllCards] = useState<CardsContentType[]>([]);
  const [vocabData, setVocabData] = useState<CardsContentType[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (deck.length === 0) {
      fetchFlashcardHandler();
    }
  }, [deck.length]);

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
      console.log(data);

      const loadedFlashcardDeck: any = [];

      for (const setKey in data) {
        loadedFlashcardDeck.push({
          id: setKey,
          setNumber: data[setKey].setNumber,
          cards: data[setKey].cards,
        });
      }
      setDeck(loadedFlashcardDeck);
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  /* Fetching vocab function (USING localStorage)*/
  useEffect(() => {
    const storedVocabs = JSON.parse(localStorage.getItem('storedVocabs')!);
    // const storedDeck = JSON.parse(localStorage.getItem('storedDeck')!);
    if (storedVocabs) {
      setVocabData(storedVocabs);
    }
    // if (storedDeck) {
    //   setDeck(storedDeck);
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem('storedVocabs', JSON.stringify(vocabData));
    // localStorage.setItem('storedDeck', JSON.stringify(deck));
  }, [vocabData]);

  // Obtain all of the cards arrays, join them and flatten it
  useEffect(() => {
    const decksArr = [];
    for (let i = 0; i < deckData.length; i++) {
      decksArr.push(deckData[i].cards);
    }
    const flattenedDecksArr = decksArr.flat();
    setAllCards(flattenedDecksArr);
  }, []);

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

  return (
    <>
      <BrowserRouter>
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
          <Route
            path="/set-one"
            element={
              <SetOne
                onPassVocabDataUp={handleVocabData}
                deckData={deck[0]}
                vocabData={vocabData}
              />
            }
          />
          <Route path="/edit-deck" element={<EditDeckPage />} />
          <Route
            path="/revise"
            element={
              <RevisePage
                vocabData={vocabData}
                onPassRevisedVocabData={handleRevisedVocabData}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
