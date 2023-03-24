import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import MenuPage from './components/Menu';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/menu" element={<MenuPage />} />
          {/* <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/coffee" element={coffeeContent} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
