import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import "./HeaderNotLoggedIn.css";

function HeaderNotLoggedIn() {
  return (
    <header className="header-not-logged">
      <Logo />
      <nav className="header-not-logged__navigation">
        <Link to="/signup" className="header-not-logged__signin-link">
          Регистрация
        </Link>
        <Link to="/signin" className="header-not-logged__login-button">
          Войти
        </Link>
      </nav>
    </header>
  );
}

export default HeaderNotLoggedIn;
