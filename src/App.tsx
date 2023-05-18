import React, { useState, useEffect, useCallback, ReactNode } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { firebaseConfig } from "./firebaseConfig";

import NavBar from "./components/Navbar";
import WelcomePage from "./pages/WelcomePage";
import MenuPage from "./pages/MenuPage";
import EditDeckPage from "./pages/EditDeckPage";
import RevisePage from "./pages/RevisePage";
import AllCardsPage from "./pages/AllCardsPage";
import FlashcardScreen from "./components/FlashcardScreen";

import deckData from "./flashcard-data";

import { CardContentType, FlashcardSetData } from "./interfaces";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/reducers/index";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function App() {
  const [deck, setDeck] = useState<FlashcardSetData[]>(deckData);
  const [allCards, setAllCards] = useState<CardContentType[]>([]);
  const [vocabData, setVocabData] = useState<CardContentType[]>([]);

  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.isLoading);
  const error = useSelector((state: RootState) => state.error);

  /* Upload initial data to Firebase */
  function writeFlashcardData(decks: FlashcardSetData[]) {
    set(ref(db, "flashcards"), {
      decks,
    })
      .then(() => {
        console.log("Data updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  }

  /* Fetching flashcard from Firebase*/
  const fetchFlashcardHandler = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetch(
        "https://english-flashcards-app-962bb-default-rtdb.asia-southeast1.firebasedatabase.app/flashcards.json"
      );
      if (!response.ok) {
        throw new Error("An error has occurred");
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
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  useEffect(() => {
    fetchFlashcardHandler();
    writeFlashcardData(deck);
  }, []);

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
    cardNumber: number
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
    // writeFlashcardData(deck);
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
        <main>
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
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
