import React, { useState, useEffect } from 'react';
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

function App() {
  const [deck, setDeck] = useState([...deckData]);
  const [allCards, setAllCards] = useState<CardsContentType[]>([]);
  const [vocabData, setVocabData] = useState<CardsContentType[]>([]);

  /* Fetching vocabs & deck function (USING localStorage)*/
  useEffect(() => {
    const storedVocabs = JSON.parse(localStorage.getItem('storedVocabs')!);
    const storedDeck = JSON.parse(localStorage.getItem('storedDeck')!);
    if (storedVocabs) {
      setVocabData(storedVocabs);
    }
    if (storedDeck) {
      setDeck(storedDeck);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('storedVocabs', JSON.stringify(vocabData));
    localStorage.setItem('storedDeck', JSON.stringify(deck));
  }, [vocabData, deck]);

  // Obtain all of the cards arrays, join them and flatten it
  useEffect(() => {
    const decksArr = [];
    for (let i = 0; i < deckData.length; i++) {
      decksArr.push(deckData[i].cards);
    }
    const flattenedDecksArr = decksArr.flat();
    setAllCards(flattenedDecksArr);
  }, []);

  function handleVocabData(newVocabData: React.SetStateAction<CardsContentType[]>) {
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
