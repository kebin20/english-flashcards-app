import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import WelcomePage from './pages/WelcomePage';
import MenuPage from './pages/MenuPage';
import EditDeckPage from './pages/EditDeckPage';
import RevisePage from './pages/RevisePage';
import SetOne from './pages/Sets/SetOne';

import deckData from './flashcard-data';

function App() {
  const [vocabData, setVocabData] = useState([]);
  const [deck, setDeck] = useState(deckData);
  
  /* Fetching vocabs function (USING localStorage)*/
  useEffect(() => {
    localStorage.setItem('storedVocabs', JSON.stringify(vocabData));
    localStorage.setItem('storedDeck', JSON.stringify(deck));
  }, [vocabData, deck]);

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

  function handleVocabData(newVocabData: React.SetStateAction<never[]>) {
    setVocabData(newVocabData);
  }

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route
            path="/set-one"
            element={
              <SetOne onPassVocabDataUp={handleVocabData} deckData={deck[0]} />
            }
          />
          <Route path="/edit-deck" element={<EditDeckPage />} />
          <Route
            path="/revise"
            element={<RevisePage vocabData={vocabData} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
