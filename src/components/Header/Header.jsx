import { useLocation, Route } from "react-router-dom";
import HeaderWhite from "../HeaderWhite/HeaderWhite";
import HeaderBlue from "../HeaderBlue/HeaderBlue";

function Header({ isPopupShown, showPopup, closePopup }) {
  const endpoints = ["/movies", "/saved-movies", "/profile", "/"];
  const isMainRoute = useLocation().pathname === "/";

  return (
    <Route exact path={endpoints}>
      {isMainRoute ? (
        <HeaderBlue />
      ) : (
        <HeaderWhite
          isPopupShown={isPopupShown}
          showPopup={showPopup}
          closePopup={closePopup}
        />
      )}
    </Route>
  );
}

export default Header;
