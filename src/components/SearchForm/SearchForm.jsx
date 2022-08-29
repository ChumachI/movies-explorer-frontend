import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ handleSearch }) {
  const [keyword, setKeyword] = useState("");
  const [showShort, setShowShort] = useState(false);

  useState(() => {
    if (localStorage.getItem("keywords")) {
      const keyword = localStorage.getItem("keywords");
      setKeyword(keyword);
    }
    if (localStorage.getItem("shorts")) {
      const shorts = JSON.parse(localStorage.getItem("shorts"));
      setShowShort(shorts);
    } else {
      localStorage.setItem("shorts", JSON.stringify(showShort));
    }
  }, []);

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
