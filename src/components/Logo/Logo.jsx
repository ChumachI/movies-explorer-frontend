import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Logo.css";
function Logo() {
  return (
    <Link to="/" className="logo">
      <img src={logo} alt="Лого сайта" />
    </Link>
  );
}

export default Logo;
