import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Register.css";

function Register({ handleRegistration, registrationErrMessage }) {
  const [formValid, setFormValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);
  const [emailError, setEmailError] = useState(
    'Поле "e-mail"  не может быть пустым'
  );
  const [passwordError, setPasswordError] = useState(
    'Поле "пароль" не может быть пустым'
  );
  const [nameError, setNameError] = useState('Поле "имя" не может быть пустым');

  useEffect(() => {
    if (passwordError || emailError || nameError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [passwordError, emailError, nameError, name, email, password]);

  function handleChange(e) {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        setEmail(e.target.value);
        const re =
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (!re.test(e.target.value.toLocaleLowerCase())) {
          setEmailError("Некорректный email");
        } else {
          setEmailError("");
        }
        break;
      case "password":
        setPasswordDirty(true);
        setPassword(e.target.value);
        if (e.target.value.length < 8) {
          setPasswordError("Длина пароля должна быть не менее 8 символов");
        } else {
          setPasswordError("");
        }
        break;
      case "name":
        setNameDirty(true);
        setName(e.target.value);
        const ne = /^[a-zA-Zа-яА-Я -]*$/i;
        if (!ne.test(e.target.value)) {
          setNameError(
            "Имя должно содержать только латиницу, кириллицу, пробел или дефис"
          );
        } else if (e.target.value.length < 2) {
          setNameError("Имя слишком короткое");
        } else if (e.target.value.length > 30) {
          setNameError("Имя слишком длинное");
        } else {
          setNameError("");
        }
        break;
      default:
    }
  }

  function handleBlur(e) {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "name":
        setNameDirty(true);
        break;
      default:
    }
  }

  return (
    <section className="register">
      <Logo />
      <h1 className="register__header">Добро пожаловать!</h1>
      <form className="register__form">
        <label className="register__form-field-label">
          Имя
          <input
            className="register__form-field"
            onBlur={handleBlur}
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
          />
          <span className="register__form-field-error">
            {nameDirty && nameError && nameError}
          </span>
        </label>
        <label className="register__form-field-label">
          E-mail
          <input
            className="register__form-field"
            onBlur={handleBlur}
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
          <span className="register__form-field-error">
            {emailDirty && emailError && emailError}
          </span>
        </label>
        <label className="register__form-field-label">
          Пароль
          <input
            className="register__form-field"
            onBlur={handleBlur}
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <span className="register__form-field-error">
            {passwordDirty && passwordError && passwordError}
          </span>
        </label>
        <div className="register__button-container">
          {registrationErrMessage && (
            <p className="register__err-message">{registrationErrMessage}</p>
          )}
          <button
            className="register__form-button"
            onClick={handleRegistration}
            disabled={formValid}
            type="submit"
          >
            Зарегистрироваться
          </button>
        </div>
        <p className="register__offer-to-login">
          Уже зарегистрированы?
          <Link to="/signin" className="register__link-to-login">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
