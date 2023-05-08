import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './components/Navbar';
import WelcomePage from './pages/WelcomePage';
import MenuPage from './pages/MenuPage';
import EditDeckPage from './pages/EditDeckPage';
import RevisePage from './pages/RevisePage';
import AllCardsPage from './pages/AllCardsPage';
import FlashcardScreen from './components/FlashcardScreen';

import deckData from './flashcard-data';

import { CardContentType, FlashcardSetData } from './interfaces';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCf3250l4lmfX3pzb7VY6Jx1NKeu7DgEYg',
  authDomain: 'english-flashcards-app-962bb.firebaseapp.com',
  databaseURL:
    'https://english-flashcards-app-962bb-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'english-flashcards-app-962bb',
  storageBucket: 'english-flashcards-app-962bb.appspot.com',
  messagingSenderId: '68752169253',
  appId: '1:68752169253:web:0fe8e45741e1e121b362cc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

function App() {
  const [deck, setDeck] = useState<FlashcardSetData[]>(deckData);
  const [allCards, setAllCards] = useState<CardContentType[]>([]);
  const [vocabData, setVocabData] = useState<CardContentType[]>([]);
  const [anyChanges, setAnyChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(deck);

  /* Upload initial data to Firebase */
  function writeFlashcardData(decks: FlashcardSetData[]) {
    set(ref(db, 'flashcards'), {
      decks,
    })
      .then(() => {
        console.log('Data updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  }

  /* Fetching flashcard from Firebase*/
  const fetchFlashcardHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://english-flashcards-app-962bb-default-rtdb.asia-southeast1.firebasedatabase.app/flashcards.json'
      );
      if (!response.ok) {
        throw new Error('An error has occurred');
      }

      const data = await response.json();
      setDeck(data.decks);

      // Obtain all of the cards arrays, join them and flatten it
      const decksArr = [];
      for (let i = 0; i < data.decks.length; i++) {
        decksArr.push(data.decks[i].cards);
      }
      const flattenedDecksArr = decksArr.flat();
      setAllCards(flattenedDecksArr);
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // if (deck.length === 0) {
    writeFlashcardData(deck);
    fetchFlashcardHandler();
    // }
  }, [anyChanges]);

  // RevisedVocab data flow and passing state up
  function handleVocabData(
    newVocabData: React.SetStateAction<CardContentType[]>
  ) {
    setVocabData(newVocabData);
  }

  function handleRevisedVocabData(
    newRevisedVocabData: React.SetStateAction<CardContentType[]>
  ) {
    setVocabData(newRevisedVocabData);
  }

  function handleUpdateCard(
    cardId: string,
    newCardData: CardContentType,
    cardNumber: number,
    handleChanges: boolean
  ) {
    setDeck((prevDeck) => {
      return prevDeck.map((deck) => {
        return {
          ...deck,
          cards: deck.cards.map((card) => {
            if (card.id === cardId && card.cardNumber === cardNumber) {
              return { ...card, ...newCardData };
            }
            return card;
          }),
        };
      });
    });
    setAnyChanges(handleChanges);
  }

  // /* Error Handling */

  let content: ReactNode = (
    <Route
      path="#"
      element={
        <>
          <h2>Data not found</h2>
        </>
      }
    />
  );

  if (deck.length > 0) {
    content = deck.map((card, index) => (
      <Route
        key={card.id}
        path={`/set-${index}`}
        element={
          <FlashcardScreen
            key={card.id}
            onPassVocabDataUp={handleVocabData}
            incomingDeck={deck[index]}
            vocabData={vocabData}
            storageItem={`cardDeckSet${card.setNumber}`}
          />
        }
      />
    ));
  }

  if (error) {
    content = <Route path="#" element={<>{error}</>} />;
  }

  if (isLoading) {
    content = (
      <Route
        path="#"
        element={
          <>
            <h2>Loading...</h2>
          </>
        }
      />
    );
  }

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/menu" element={<MenuPage deck={deck} />} />
          <Route
            path="/all-cards"
            element={
              <AllCardsPage
                vocabData={vocabData}
                incomingDeck={allCards}
                onPassVocabDataUp={handleVocabData}
                storageItem="allCards"
              />
            }
          />
          {content}
          <Route
            path="/edit-deck"
            element={
              <EditDeckPage deckData={deck} onUpdateCard={handleUpdateCard} />
            }
          />
          <Route
            path="/revise"
            element={
              <RevisePage
                vocabData={vocabData}
                storageItem="revisedCardsDeck"
                incomingDeck={vocabData}
                onPassRevisedVocabDataUp={handleRevisedVocabData}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
