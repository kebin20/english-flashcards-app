import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import WelcomeScreen from './pages/WelcomePage';
import MenuPage from './pages/MenuPage';
import EditDeck from './pages/EditDeckPage';
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
          <Route path="/" element={<WelcomeScreen />} />
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
          <Route path="/edit-deck" element={<EditDeck />} />
          {/* <Route path="/revise" element={<Revise/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
