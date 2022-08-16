import "./MoviesCard.css";
import cardSavedFlag from "../../images/saved.svg";
import cardNotSavedFlag from "../../images/not_saved.svg";

function MoviesCard({ card }) {
  return (
    <div className="card">
      <div className="card__top-line">
        <div>
          <h3 className="card__name">33 слова о дизайне</h3>
          <time className="card__duration">1ч 47м</time>
        </div>
        <button className="card__save-button">
          <img
            src={card.isLiked ? cardSavedFlag : cardNotSavedFlag}
            alt="Сохранить"
          />
        </button>
      </div>
      <img className="card__poster" src={card.image} alt="Постер фильма" />
    </div>
  );
}

export default MoviesCard;
