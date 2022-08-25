import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState } from "react";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  cards,
  isLoading,
  handleDeleteMovie,
  handleSaveMovie,
  isLoadingErr,
}) {
  const totalCardsNumber = cards.length;
  const isFound = cards.length > 0;
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
    setshownCardsCounter(shownCardsCounter + getShownCardsCounter() / 4);
  }

  return (
    <div className="movies-list-container">
      <ul className="movies-list__list">
        {isLoading ? (
          <Preloader />
        ) : isLoadingErr ? (
          <p className="movies-list__message">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
        ) : isFound ? (
          shownCards.map((card, index) => {
            return (
              <MoviesCard
                card={card}
                key={index}
                handleDeleteMovie={handleDeleteMovie}
                handleSaveMovie={handleSaveMovie}
              />
            );
          })
        ) : (
          <p className="movies-list__message">Ничего не найдено</p>
        )}
      </ul>
      {!isEachCardShown && (
        <button
          className="movies-list__more-button"
          type="button"
          onClick={handleMoreButtonClick}
        >
          Ещё
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
