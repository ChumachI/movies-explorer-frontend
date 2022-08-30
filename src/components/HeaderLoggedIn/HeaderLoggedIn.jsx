import Logo from "../Logo/Logo";
import Popup from "../Popup/Popup";
import AccountButton from "../AccountButton/AccountButton";
import { NavLink, useLocation } from "react-router-dom";

import "./HeaderLoggedIn.css";
import { useEffect, useState } from "react";

function HeaderLoggedIn({ isPopupShown, showPopup, closePopup }) {
  const route = useLocation();
  const [isMainRoute, setMainRoute] = useState(true);
  
  useEffect(()=>{
    if(route.pathname === '/'){
      setMainRoute(true);
    } else {
      setMainRoute(false);
    }
  },[route])

  return (
    <header className={`header-logged ${isMainRoute && 'header-logged_blue'}`}>
      <Logo />
      <div className="header-logged__navigation-container">
        <nav className="header-logged__navigation">
          <NavLink
            to="/movies"
            className={`header-logged__link ${isMainRoute && 'header-logged__link_blue'}`}
            activeClassName="header-logged__link_acive"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={`header-logged__link ${isMainRoute && 'header-logged__link_blue'}`}
            activeClassName="header-logged__link_acive"
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <AccountButton isMainRoute = {isMainRoute}/>
      </div>
      <button className={`header__burger ${isMainRoute && 'header__burger_blue'}`} type="button" onClick={showPopup}>
        <div className={`header__burger-line ${ isMainRoute && 'header__burger-line_wjite'}`}></div>
        <div className={`header__burger-line ${ isMainRoute && 'header__burger-line_wjite'}`}></div>
        <div className={`header__burger-line ${ isMainRoute && 'header__burger-line_wjite'}`}></div>
      </button>
      {isPopupShown && <Popup closePopup={closePopup} />}
    </header>
  );
}

export default HeaderLoggedIn;
