import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomePage";
import MenuPage from "./pages/MenuPage";
import FlashcardPage from "./pages/FlashcardPage";
import EditDeck from "./pages/EditDeckPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/flashcard-page" element={<FlashcardPage />} />
          <Route path="/edit-deck" element={<EditDeck />} />
          {/* <Route path="/revise" element={<Revise/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
