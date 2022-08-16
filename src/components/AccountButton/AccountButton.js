import "./AccountButton.css";
import { Link } from "react-router-dom";
import accountButtonImg from "../../images/account_button_icon.svg";
function AccountButton() {
  return (
    <Link to="/profile" className="account-button">
      Аккаунт
      <div className="account-button__img-circle-frame">
        <img
          src={accountButtonImg}
          alt="Иконка кнопки перехода в ваш аккаунт"
        />
      </div>
    </Link>
  );
}

export default AccountButton;
