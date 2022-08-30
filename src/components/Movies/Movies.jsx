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
  const [showShort, setShowShort] = useState(false);
  const [isFirstVisit, setFirstVisit] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("keywords") && localStorage.getItem("movies")) {
      const keywords = localStorage.getItem("keywords");
      filterCards(keywords);
      setFirstVisit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, savedMovies, showShort]);
  

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
    const newFilteredCards = cards.filter((card) => {
      if (!showShort && card.duration <= 40) {
        return false;
      }
      return card.nameRU.toLowerCase().includes(keywords.toLowerCase());
    });
    setFilteredCards(newFilteredCards);
  }

  return (
    <section className="movies">
      <SearchForm handleSearch={search} showShort={showShort} setShowShort={setShowShort}/>
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
