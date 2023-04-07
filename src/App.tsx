import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import WelcomePage from './pages/WelcomePage';
import MenuPage from './pages/MenuPage';
import EditDeckPage from './pages/EditDeckPage';
import RevisePage from './pages/RevisePage';
import AllCards from './pages/Sets/AllCards';
import SetOne from './pages/Sets/SetOne';

import deckData from './flashcard-data';

function App() {
  const [deck, setDeck] = useState([...deckData]);
  const [vocabData, setVocabData] = useState([]);

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

  function handleVocabData(newVocabData: React.SetStateAction<never[]>) {
    setVocabData(newVocabData);
  }

  function handleRevisedVocabData(
    newRevisedVocabData: React.SetStateAction<never[]>
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
          {/* <Route
            path="/all-cards"
            element={
              <AllCards
                onPassVocabDataUp={handleVocabData}
                deckData={deck}
                vocabData={vocabData}
              />
            }
          /> */}
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
