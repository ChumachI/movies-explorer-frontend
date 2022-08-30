import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";

function SearchForm({ handleSearch, showShort, setShowShort, isLoading }) {
  const [keyword, setKeyword] = useState("");
  const path = useLocation().pathname;

  useState(() => {
    if (path === "/movies") {
      if (localStorage.getItem("keywords")) {
        const keyword = localStorage.getItem("keywords");
        setKeyword(keyword);
      }
    }
  }, [path]);

  function handleChange(e) {
    setKeyword(e.target.value);
    localStorage.setItem("keywords", e.target.value);
  }

  function toggleShort(e) {
    setShowShort(e.target.checked);
    localStorage.setItem("shorts", e.target.checked);
  }

  return (
    <form className="search-form">
      <div className="search-form__input-container">
        <input
          type="text"
          name="keywords"
          className="search-form__input-line"
          placeholder="Фильм"
          required
          value={keyword}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="search-form__button"
          onClick={handleSearch}
          disabled={isLoading}
        >
          Найти
        </button>
      </div>
      <label htmlFor="short-film" className="search-form__checkbox-label">
        <input
          type="checkbox"
          id="short-film"
          className="search-form__invisible-checkbox"
          checked={showShort}
          onChange={toggleShort}
          disabled={isLoading}
        />
        <div className="search-form__visible-checkbox-frame">
          <div className="search-form__visible-checkbox-inner-circle"></div>
        </div>
        Короткометражки
      </label>
      <hr className="search-form__separator" />
    </form>
  );
}

export default SearchForm;
