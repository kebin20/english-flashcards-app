import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomePage";
import MenuPage from "./pages/MenuPage";
import EditDeck from "./pages/EditDeckPage";
import SetOne from "./pages/Sets/SetOne";

import deckData from "./flashcard-data";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/set-one" element={<SetOne deckData={deckData[0]} />} />
          <Route path="/edit-deck" element={<EditDeck />} />
          {/* <Route path="/revise" element={<Revise/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
