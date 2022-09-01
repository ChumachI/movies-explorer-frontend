import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  cards,
  isLoading,
  handleDeleteMovie,
  handleSaveMovie,
  isLoadingErr,
  isFirstVisit,
  isLikeDislikeRequestOn
}) {
  const totalCardsNumber = cards.length;
  const [shownCardsCounter, setshownCardsCounter] = useState(
    getShownCardsCounter()
  );
  const [isFound, setFound] = useState(false);

  useEffect(()=>{
    setFound(cards.length > 0)
  },[cards])

  useEffect(() => {
    window.addEventListener("resize", changeShownCardsCounter);
    return () => {
      window.removeEventListener("resize", changeShownCardsCounter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeShownCardsCounter() {
    setshownCardsCounter(getShownCardsCounter());
  }

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

  function handleMoreButtonClick() {
    setshownCardsCounter(shownCardsCounter + getShownCardsCounter() / 4);
  }

  return (
    <div className="movies-list-container">
      <ul className="movies-list__list">
        {isLoading ? (
          <Preloader />
        ) : isFirstVisit ? (
          ""
        ) : isLoadingErr ? (
          <p className="movies-list__message">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз
          </p>
        ) : isFound ? (
          shownCards.map((card, index) => {
            return (
              <MoviesCard
                card={card}
                key={card.id}
                handleDeleteMovie={handleDeleteMovie}
                handleSaveMovie={handleSaveMovie}
                isLikeDislikeRequestOn={isLikeDislikeRequestOn}
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
