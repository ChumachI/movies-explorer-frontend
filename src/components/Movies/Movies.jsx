import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState } from "react";
import { useEffect } from "react";

function Movies({
  handleSearch,
  isLoading,
  handleDeleteMovie,
  handleSaveMovie,
  savedMovies,
  cards,
  isLoadingErr,
}) {
  const [filteredCards, setFilteredCards] = useState(cards);

  useEffect(() => {
    if (localStorage.getItem("keywords") && localStorage.getItem("movies")) {
      const keywords = localStorage.getItem("keywords");
      filterCards(keywords);
      setFirstVisit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, savedMovies]);
  const [isFirstVisit, setFirstVisit] = useState(true);

  function search(e) {
    e.preventDefault();
    const keywords = e.target.form.keywords.value;
    if (!localStorage.getItem("keywords")) {
      localStorage.setItem("keywords", keywords);
    }
    handleSearch()
      .then(() => {
        filterCards(keywords);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function filterCards(keywords) {
    const shorts = JSON.parse(localStorage.getItem("shorts"));
    const newFilteredCards = cards.filter((card) => {
      if (!shorts && card.duration <= 40) {
        return false;
      }
      return card.nameRU.toLowerCase().includes(keywords.toLowerCase());
    });
    setFilteredCards(newFilteredCards);
  }

  return (
    <section className="movies">
      <SearchForm handleSearch={search} />
      <MoviesCardList
        cards={filteredCards}
        isLoading={isLoading}
        handleDeleteMovie={handleDeleteMovie}
        handleSaveMovie={handleSaveMovie}
        isLoadingErr={isLoadingErr}
        isFirstVisit={isFirstVisit}
      />
    </section>
  );
}

export default Movies;
