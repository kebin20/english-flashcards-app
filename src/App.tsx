import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import MenuPage from './components/MenuPage';
import FlashcardPage from './components/FlashcardPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/flashcard-page" element={<FlashcardPage />} />
          {/* <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/coffee" element={coffeeContent} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
