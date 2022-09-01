import "./MoviesCard.css";
import cardSavedFlag from "../../images/saved.svg";
import cardNotSavedFlag from "../../images/not_saved.svg";
import deleteCardImg from "../../images/DeleteCardImg.svg"
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({ card, handleDeleteMovie, handleSaveMovie, isLikeDislikeRequestOn }) {
  const hours = Math.floor(card.duration / 60);
  const minutes = card.duration % 60;
  const [isLiked, setLiked] = useState(false);
  const [isSavedMoviesRoute, setSavedMoviesRoute] = useState(false);

  const path = useLocation().pathname;
  

  useEffect(()=>{
    if(path === '/saved-movies'){
      setSavedMoviesRoute(true);
    }
  },[path])

  useEffect(() => {
    setLiked(card.isLiked);
  }, [card]);

  function saveMovie() {
    handleSaveMovie(card).then(() => {
      setLiked(true);
    });
  }

  function deleteMovie() {
    handleDeleteMovie(card).then(() => {
      setLiked(false);
    });
  }

  return (
    <div className="card">
      <div className="card__top-line">
        <div>
          <h3 className="card__name">{card.nameRU}</h3>
          <time className="card__duration">
            {hours}ч {minutes}м
          </time>
        </div>
        
        <button
          type="button"
          className="card__save-button"
          onClick={isLiked ? deleteMovie : saveMovie}
          disabled={isLikeDislikeRequestOn}
        >
          <img
            src={isSavedMoviesRoute ?  deleteCardImg : isLiked ? cardSavedFlag : cardNotSavedFlag}
            alt="Сохранить"
          />
        </button>
      </div>
      <a href={card.trailerLink}>
        <img
          className="card__poster"
          src={"https://api.nomoreparties.co/." + card.image.url}
          alt="Постер фильма"
        />
      </a>
    </div>
  );
}

export default MoviesCard;
