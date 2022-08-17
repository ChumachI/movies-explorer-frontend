import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
function SavedMovies({ cards }) {
  cards = cards.filter((card) => card.isLiked);

  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList cards={cards} />
    </section>
  );
}

export default SavedMovies;
