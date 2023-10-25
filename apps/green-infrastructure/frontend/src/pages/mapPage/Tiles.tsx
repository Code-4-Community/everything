import FlippableTile from './FlippableTile';

const cards = [
    {
      id: "0",
      front: "Submit a Maintenance Report",
      back: "Back"
    },
    {
      id: "1",
      front: "Click 1",
      back: "Back"
    },
    {
      id: "2",
      front: "Adapt a GI Feature",
      back: "Back"
    },
    {
      id: "3",
      front: "Click3",
      back: "Back"
    },
    {
      id: "4",
      front: "Submit a Condition Assessment",
      back: "Back"
    },
    {
      id: "5",
      front: "Click5",
      back: "Back"
    },
  ];
  
  export default function App() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    {cards.slice(0, 2).map((card) => (
                        <FlippableTile key={card.id} card={card} />
                    ))}
                </div>
            <div className="col-md-4">
                    {cards.slice(2, 4).map((card) => (
                        <FlippableTile key={card.id} card={card} />
                    ))}
            </div>
            <div className="col-md-4">
                    {cards.slice(4, 6).map((card) => (
                        <FlippableTile key={card.id} card={card} />
                    ))}
            </div>
        </div>
      </div>
    );
  }