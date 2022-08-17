import "./SearchForm.css";

function SearchForm() {
  return (
    <form className="search-form">
      <div className="search-form__input-container">
        <input
          type="text"
          className="search-form__input-line"
          placeholder="Фильм"
          required
        />
        <button type="submit" className="search-form__button">
          Найти
        </button>
      </div>
      <label for="short-film" class="search-form__checkbox-label">
        <input
          type="checkbox"
          id="short-film"
          class="search-form__invisible-checkbox"
          defaultChecked
        />
        <div class="search-form__visible-checkbox-frame">
          <div class="search-form__visible-checkbox-inner-circle"></div>
        </div>
        Короткометражки
      </label>
      <hr className="search-form__separator" />
    </form>
  );
}

export default SearchForm;
