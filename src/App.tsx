import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./components/board.js";
import Form from "./components/form.js";

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    try {
      const savedCards = localStorage.getItem("cards");
      if (savedCards) {
        setCards(JSON.parse(savedCards));
      }
    } catch (error) {
      console.error("Error loading cards from local storage:", error);
    }
  }, []);

  //function to save card to local storage
  const saveToLocalStorage = (card) => {    
    try {
      localStorage.setItem("cards", JSON.stringify(card));
    } catch (error) {
      console.error("Error saving cards to local storage:", error);
    }
  };

  //function to add a new card using the form (sets initial status of card:unclaimed + assigns unique id)
  const addCard = (cardData) => {
    const newCard = { ...cardData, id: Date.now(), status: "Unclaimed" };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    saveToLocalStorage(updatedCards);
  };

  //function to update card status
  const updateCardStatus = (cardId, newStatus) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, status: newStatus } : card
    );
    setCards(updatedCards);
    saveToLocalStorage(updatedCards);
  };

  //function to update card
  const updateCard = (updatedCard) => {
    const updatedCards = cards.map((card) =>
      card.id === updatedCard.id ? updatedCard : card
    );
    setCards(updatedCards);
    saveToLocalStorage(updatedCards);
  };


  //function  to delete card
  const deleteCard = (cardId) => {
    const updatedCards = cards.filter((card) => card.id !== cardId);
    setCards(updatedCards);
    saveToLocalStorage(updatedCards);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-gray-800 min-h-screen p-5">
        <header className="flex flex-col items-center justify-center text-2xl text-white mb-8">
          <b>Kanban Board</b>
        </header>
        <div className="flex flex-row text-white">
          <Form onAddCard={addCard} />
          <Board
            cards={cards}
            onUpdateCard={updateCard}
            onDeleteCard={deleteCard}
            onUpdateCardStatus={updateCardStatus}
          />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
