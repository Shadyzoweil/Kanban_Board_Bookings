import Card from "./card.js";
import { useDrop } from "react-dnd";

function Board({ cards, onUpdateCard, onDeleteCard, onUpdateCardStatus }) {
  const columns = ["Unclaimed", "First Contact", "Preparing Work Offer", "Send to Therapist"];

  return (
    <div className="flex flex-row w-full justify-between gap-2   ">
      {columns.map((column) => (
        <Column
          key={column}
          columnName={column}
          cards={cards.filter((card) => card.status === column)}
          onUpdateCardStatus={onUpdateCardStatus}
          onUpdateCard={onUpdateCard}
          onDeleteCard={onDeleteCard}
        />
      ))}
    </div>
  );
}

function Column({ columnName, cards, onUpdateCardStatus, onUpdateCard, onDeleteCard }) {
  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item) => onUpdateCardStatus(item.id, columnName),
  });

  return (
    <div ref={drop} className="flex-1 text-center">
      
      <b>
        {columnName} ({cards.length})
      </b>
      <div className="bg-blue-500 border border-white mt-2 text-black p-2 h-[400px] overflow-y-auto rounded-lg">
        {cards.map((card) => (
          <Card
            key={card.id}
            index={card.id}
            cardData={card}
            onUpdateCard={onUpdateCard}
            onDeleteCard={onDeleteCard}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
