import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState } from "react";

function MoviesCardList({ cards }) {
  const totalCardsNumber = cards.length;
  const [shownCardsCounter, setshownCardsCounter] = useState(
    getShownCardsCounter()
  );

  function getShownCardsCounter() {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 767) {
      return 5;
    } else if (windowWidth <= 1279) {
      return 8;
    }
    return 12;
  }

  const shownCards = cards.slice(0, shownCardsCounter);
  const isEachCardShown = shownCardsCounter >= totalCardsNumber;

  window.addEventListener("resize", function () {
    setshownCardsCounter(getShownCardsCounter());
  });

  function handleMoreButtonClick() {
    setshownCardsCounter(getShownCardsCounter() * 2);
  }

  return (
    <div className="movies-list-container">
      <ul className="movies-list__list">
        {shownCards.map((card) => {
          return <MoviesCard card={card} />;
        })}
      </ul>
      <button
        className="movies-list__more-button"
        type="button"
        disabled={isEachCardShown}
        onClick={handleMoreButtonClick}
      >
        Ещё
      </button>
    </div>
  );
}

export default MoviesCardList;
