import React, { useState } from 'react';
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
              <SetOne
                onPassVocabDataUp={handleVocabData}
                deckData={deckData[0]}
              />
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
