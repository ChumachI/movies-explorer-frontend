import Logo from "../Logo/Logo";
import Popup from "../Popup/Popup";
import AccountButton from "../AccountButton/AccountButton";
import { NavLink } from "react-router-dom";

import "./HeaderWhite.css";

function HeaderWhite({ isPopupShown, showPopup, closePopup }) {
  return (
    <header className="header-white">
      <Logo />
      <div className="header-white__navigation-container">
        <nav className="header-white__navigation">
          <NavLink
            to="/movies"
            className="header-white__link"
            activeClassName="header-white__link_acive"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="header-white__link"
            activeClassName="header-white__link_acive"
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <AccountButton />
      </div>
      <button className="header__burger" onClick={showPopup}>
        <div className="header__burger-line"></div>
        <div className="header__burger-line"></div>
        <div className="header__burger-line"></div>
      </button>
      {isPopupShown && <Popup closePopup={closePopup} />}
    </header>
  );
}

export default HeaderWhite;
