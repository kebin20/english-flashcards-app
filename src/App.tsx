import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import MenuPage from './components/MenuPage';
import FlashcardPage from './components/FlashcardPage';
import EditDeck from './components/EditDeck';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/flashcard-page" element={<FlashcardPage />} />
          <Route path="/edit-deck" element={<EditDeck/>} />
          {/* <Route path="/revise" element={<Revise/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
