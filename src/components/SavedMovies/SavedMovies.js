import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState } from "react";
import { useEffect } from "react";
function SavedMovies({ cards, handleDeleteMovie, isLoading, savedMovies }) {
  const [filteredCards, setFilteredCards] = useState(cards);
  const [notShortFilms, setNotShortFilms] = useState(cards)
  const [isShorts, setShorts] = useState(false);
  
  useEffect(()=>{
    const likedCards = cards.filter((card) => card.isLiked);
    setFilteredCards(likedCards)    
  },[savedMovies, cards])


  useEffect(()=>{
    const shorts = filteredCards.filter((elem)=> {
      return elem.duration > 40;
    })
    setNotShortFilms(shorts);
  },[filteredCards, savedMovies])


  function search(e) {
    e.preventDefault();
    const keywords = e.target.form.keywords.value;
    if (!localStorage.getItem("keywords")) {
      localStorage.setItem("keywords", keywords);
    }
    filterCards(keywords);
  }

  function filterCards(keywords) {
    setShorts(JSON.parse(localStorage.getItem("shorts")));
    

    const filteredCards = cards.filter((card) => {
      if(!card.isLiked){
        return false;
      }
      return card.nameRU.toLowerCase().includes(keywords.toLowerCase());
    });
    setFilteredCards(filteredCards);
    setNotShortFilms(filteredCards.filter((elem)=> {
      return elem.duration > 40;
    }));
  }

  return (
    <section className="saved-movies">
      <SearchForm handleSearch={search}/>
      <MoviesCardList cards={!isShorts ? notShortFilms : filteredCards} handleDeleteMovie={handleDeleteMovie} isLoading={isLoading}/>
    </section>
  );
}

export default SavedMovies;
