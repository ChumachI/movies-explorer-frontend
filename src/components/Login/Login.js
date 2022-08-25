import "./Login.css";
import Logo from "../Logo/Logo";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Login({
  handleBlur,
  handleChange,
  emailDirty,
  passwordDirty,
  email,
  password,
  passwordError,
  emailError,
  handleLogin,
}) {
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (passwordError || emailError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [passwordError, emailError]);

  return (
    <section className="login">
      <Logo />
      <h1 className="login__header">Рады видеть!</h1>
      <form className="login__form">
        <label className="login__form-field-label">
          E-mail
          <input
            className="login__form-field"
            onBlur={handleBlur}
            name="email"
            type="email"
            value={email}
            onChange={(e) => handleChange(e)}
            autoComplete="email"
          />
          <span className="login__form-field-error">
            {emailDirty && emailError && emailError}
          </span>
        </label>
        <label className="login__form-field-label">
          Пароль
          <input
            className="login__form-field"
            onBlur={handleBlur}
            name="password"
            type="password"
            value={password}
            onChange={(e) => handleChange(e)}
            autoComplete="current-password"
          />
          <span className="login__form-field-error">
            {passwordDirty && passwordError && passwordError}
          </span>
        </label>
        <button
          className="login__form-button"
          onClick={handleLogin}
          disabled={formValid}
          type="submit"
        >
          Войти
        </button>
        <p className="login__offer-to-login">
          Ещё не зарегистрированы?
          <Link to="/signup" className="login__link-to-login">
            Регистрация
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
