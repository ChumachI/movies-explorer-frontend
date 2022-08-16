import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import "./HeaderBlue.css";

function HeaderBlue() {
  return (
    <header className="header-blue">
      <Logo />
      <nav className="header-blue__navigation">
        <Link to="/signup" className="header-blue__signin-link">
          Регистрация
        </Link>
        <Link to="/signin" className="header-blue__login-button">
          Войти
        </Link>
      </nav>
    </header>
  );
}

export default HeaderBlue;
