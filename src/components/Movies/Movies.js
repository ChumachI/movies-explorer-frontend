import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState } from "react";
import { useEffect } from "react";

function Movies({ handleSearch, isLoading, handleDeleteMovie, handleSaveMovie, savedMovies, cards, isLoadingErr}) {
  const [filteredCards, setFilteredCards] = useState(cards);

  useEffect(() => {
    if (localStorage.getItem("keywords") && localStorage.getItem("movies")) {
      const keywords = localStorage.getItem("keywords");
      filterCards(keywords);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isLoading, savedMovies]);
  
  function search(e) {
    
    e.preventDefault();
    const keywords = e.target.form.keywords.value;
    if (!localStorage.getItem("keywords")) {
      localStorage.setItem("keywords", keywords);
    }
    handleSearch();
    filterCards(keywords);
  }

  function filterCards(keywords) {
    const shortsOff = JSON.parse(localStorage.getItem("shorts"));
    const filteredCards = cards.filter((card) => {
      if(!shortsOff && (card.duration <= 40)){
        return false;
      }
      return card.nameRU.toLowerCase().includes(keywords.toLowerCase());
    });
    setFilteredCards(filteredCards);
  }



  return (
    <section className="movies">
      <SearchForm handleSearch={search} />
    <MoviesCardList cards={filteredCards} isLoading={isLoading} handleDeleteMovie={handleDeleteMovie} handleSaveMovie={handleSaveMovie} isLoadingErr={isLoadingErr}/>
    </section>
  );
}

export default Movies;
