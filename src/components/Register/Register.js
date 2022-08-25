import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Register.css";

function Register({
  handleBlur,
  handleChange,
  handleRegistration,
  nameDirty,
  emailDirty,
  passwordDirty,
  name,
  email,
  password,
  passwordError,
  emailError,
  nameError,
  registrationErr,
}) {
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (passwordError || emailError || nameError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [passwordError, emailError, nameError, name, email, password]);

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
        {registrationErr && <p className="register__err-message">{registrationErr}</p>}
        <button
          className="register__form-button"
          onClick={handleRegistration}
          disabled={formValid}
          type="submit"
        >
          Зарегистрироваться
        </button>
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
