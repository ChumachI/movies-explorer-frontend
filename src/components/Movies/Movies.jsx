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
  isLikeDislikeRequestOn
}) {
  const [filteredCards, setFilteredCards] = useState(cards);
  const [showShort, setShowShort] = useState(false);
  const [isFirstVisit, setFirstVisit] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("keywords") && localStorage.getItem("movies")) {
      const keywords = localStorage.getItem("keywords");
      filterCards(keywords);
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, savedMovies, showShort]);

  useEffect(()=>{
    if (localStorage.getItem("shorts")) {
      const shorts = JSON.parse(localStorage.getItem("shorts"));
      setShowShort(shorts);
    } else {
      localStorage.setItem("shorts", showShort);
    }
  },[showShort])
  

  function search(e) {
    e.preventDefault();
    const keywords = e.target.form.keywords.value;
    if (!localStorage.getItem("keywords")) {
      localStorage.setItem("keywords", keywords);
    }
    handleSearch()
      .then(() => {
        filterCards(keywords);
        setFirstVisit(false);
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
      <SearchForm handleSearch={search} showShort={showShort} setShowShort={setShowShort} isLoading = {isLoading}/>
      <MoviesCardList
        cards={filteredCards}
        isLoading={isLoading}
        handleDeleteMovie={handleDeleteMovie}
        handleSaveMovie={handleSaveMovie}
        isLoadingErr={isLoadingErr}
        isFirstVisit={isFirstVisit}
        isLikeDislikeRequestOn={isLikeDislikeRequestOn}
      />
    </section>
  );
}

export default Movies;
