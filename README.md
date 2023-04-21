![english-flashcard-app](./screenshots/homepage-desktop.PNG)

# English Flashcards App (WIP)

## Table of contents

- [Overview](#overview)
  - [Main Function](#main-function)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Continued development](#continued-development)

## Overview

### Main Function

Users should be able to:
- Access flashcard sets and start revising vocabulary that has been learnt in the past year. 
- Sort through the cards one by one and being able to see the the English and Japanese sides.
- Store cards needing to be learnt and revise them in a separate page.
- Remove cards that have been learnt from current deck.
- Being able to edit the master deck and editing the card contents (WIP)

### Links

- Solution URL: [Github Repo](https://github.com/kebin20/english-flashcards-app)
- Live Site URL: [Flashcard](https://english-flashcard.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- CSS Modules
- [Firebase](https://firebase.google.com/) - Backend as a Service
- [TypeScript](https://www.typescriptlang.org/) - TypeScript - Strongly typed programming language on top of JS
- [React](https://reactjs.org/) - JS framework
- [React Router](https://reactrouter.com/en/main) - React routing library
- [![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

## What I learnt & Challenges I faced

(WILL MOVE THIS TO A BLOG POST)

Creating this app enabled me to fully utilise all the concepts I have learnt throughout my coding journey. It was a great practice in using styled components and React Router as I wanted to be more familiar with these 2 tools for React. 

I faced numerous challenges throughout the creation of this app and one of the biggest challenge was deciding on how to store the flashcard data and how to keep the state of the flashcards. The use case for this app was main for students being able to revise the vocabs learnt from the textbooks used since they were 3rd graders. 

I thought of uploading every single flashcard into Firebase but I decided not to since it would have been far too complicated and each student will need to login with a registered account which would create a big hassle. 

Since each student within the school have their own tablets that they use during lessons, I decided that localStorage would be the easiest and most accessible solution for students to keep track on the cards that they have been revising. 

Then, the main master deck would be stored in Firebase, only accessible to the teachers. 

It was quite a challenge implementing the firebase feature as I was still not very familiar with the tech but I eventually succeeded in uploading the master deck to firebase and fetching the main data and this perhaps was one of my main achievements:

```jsx
 /* Upload initial data to Firebase */
  function writeFlashcardData(decks: FlashcardSetData[]) {
    const db = getDatabase();
    set(ref(db, 'flashcards'), {
      decks,
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
    if (deck.length === 0) {
      writeFlashcardData(deckData);
      fetchFlashcardHandler();
    }
  }, [deck.length]);
  ```

There was a lot of moving parts involved when passing props up and down the components when the user decided they have learnt the vocabs, removing it from their list and so on which also involved in setting and deleting the user's cards from localStorage. I think useContext would be very useful here but seeing that the prop drilling wasn't too deep, I decided to just pass the props around to keep it simple and understandable. 

21/04/23 Update on each flashcard component not saving it's state

I was struggling with this problem for nearly a week, trying to figure out why the state of the flashcards do not remain after page refresh or exiting the page. 

My first crack at the solution was to use localStorage to store the state of the array within each FlashcardScreen component so that rather than the component reusing the original data that was being passed down, it will use the data that was stored in localStorage. 

Hence my solution was:

```jsx
  // useEffect(() => {
  //   localStorage.setItem(`cardDeckSet`, JSON.stringify(cardDeck));
  // }, []);
```

However, I came across a bug where once you enter into another flashcard Set (for example, I will enter into Set 1, exit and enter Set 2), it will then show the SAME updated flashcard set from Set 1! 

I didn't realise that since there were multiple instances of the same component, if I store the current state data in just one item in localStorage, that means ALL of the other flashcard components will get the same state. 

After a long time trying to think of a way to tackle this, I decided to make multiple cardDeckSet items in local storage like so:

```jsx
  // useEffect(() => {
  //   localStorage.setItem(`cardDeckSet${setNumber}`, JSON.stringify(cardDeck));
  // }, []);
```

The next problem I encountered was that there was a discrepancy in setting the updated state in localStorage. 


```jsx 
  function vocabLearnt() {
    const cardToRemove = cardDeck[cardIndex];
    const newCardDeck = cardDeck.filter((card) => card.id !== cardToRemove.id)
    // setCardDeck((prevCardDeck) =>
    //   prevCardDeck.filter((card) => card.id !== cardToRemove.id)
    // );
    setCardDeck(newCardDeck)
    localStorage.setItem(`cardDeckSet${setNumber}`, JSON.stringify(newCardDeck));
  }
```

### Continued development & future implementations

- Enable users to edit the master deck and change the content of the flashcards first (WIP)
 - Afterwards, being able to delete the cards/sets and add new ones as the user wishes.
- Add a button to randomise the flashcards for extra variety.
- Add animation for the cards when they flip. 