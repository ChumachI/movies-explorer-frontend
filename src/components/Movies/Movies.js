import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ cards }) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList cards={cards} />
    </section>
  );
}

export default Movies;
