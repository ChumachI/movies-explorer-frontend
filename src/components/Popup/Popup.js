import { NavLink } from "react-router-dom";
import AccountButton from "../AccountButton/AccountButton";
import "./Popup.css";

function Popup({ closePopup }) {
  return (
    <div className="popup">
      <div className="popup__overlay"></div>
      <div className="popup__continer">
        <button
          className="popup__close"
          onClick={closePopup}
          type="button"
        ></button>
        <nav className="popup__navigation">
          <NavLink
            className="popup__link"
            activeClassName="popup__link_active"
            exact
            to="/"
          >
            Главная
          </NavLink>
          <NavLink
            className="popup__link"
            activeClassName="popup__link_active"
            to="/movies"
          >
            Фильмы
          </NavLink>
          <NavLink
            className="popup__link"
            activeClassName="popup__link_active"
            to="/saved-movies"
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <AccountButton />
      </div>
    </div>
  );
}

export default Popup;
