import { Route } from "react-router-dom";
import HeaderLoggedIn from "../HeaderLoggedIn/HeaderLoggedIn";
import HeaderNotLoggedIn from "../HeaderNotLoggedIn/HeaderNotLoggedIn";

function Header({ isPopupShown, showPopup, closePopup, isLoggedIn }) {
  const endpoints = ["/movies", "/saved-movies", "/profile", "/"];

  return (
    <Route exact path={endpoints}>
      {isLoggedIn ? (
        <HeaderLoggedIn
          isPopupShown={isPopupShown}
          showPopup={showPopup}
          closePopup={closePopup}
        />
      ) : (
        <HeaderNotLoggedIn />
      )}
    </Route>
  );
}

export default Header;
