import "./MoviesCard.css";
import cardSavedFlag from "../../images/saved.svg";
import cardNotSavedFlag from "../../images/not_saved.svg";
import { useState } from "react";
import { useEffect } from "react";

function MoviesCard({ card, handleDeleteMovie, handleSaveMovie}) {
  const hours = Math.floor(card.duration/60);
  const minutes = card.duration%60;
const [isLiked, setLiked] = useState(false);

useEffect(()=>{
  setLiked(card.isLiked)
},[card]);

function saveMovie() {
  handleSaveMovie(card)
  .then(()=>{
    setLiked(true);
  })
}

function deleteMovie() {
  handleDeleteMovie(card)
  .then(()=>{
    setLiked(false);
  })
}






  return (
    <div className="card">
      <div className="card__top-line">
        <div>
          <h3 className="card__name">{card.nameRU}</h3>
          <time className="card__duration">{hours}ч {minutes}м</time>
        </div>
        <button type="button" className="card__save-button" onClick={isLiked ? deleteMovie : saveMovie}>
            <img
              src={isLiked ? cardSavedFlag : cardNotSavedFlag}
              alt="Сохранить"
            />
        </button>
      </div>
      <a href={card.trailerLink} >
        <img className="card__poster" src={'https://api.nomoreparties.co/.' + card.image.url} alt="Постер фильма" />
      </a>
      
    </div>
  );
}

export default MoviesCard;
