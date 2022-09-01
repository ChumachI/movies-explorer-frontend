import "./Login.css";
import Logo from "../Logo/Logo";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Login({ handleLogin, isLoading }) {
  const [formNotValidValid, setFormNotValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState(
    'Поле "e-mail"  не может быть пустым'
  );
  const [passwordError, setPasswordError] = useState(
    'Поле "пароль" не может быть пустым'
  );

  useEffect(() => {
    if (passwordError || emailError) {
      setFormNotValid(true);
    } else {
      setFormNotValid(false);
    }
  }, [passwordError, emailError]);

  function handleBlur(e) {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
    }
  }

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
      default:
    }
  }

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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          <span className="login__form-field-error">
            {passwordDirty && passwordError && passwordError}
          </span>
        </label>
        <button
          className="login__form-button"
          onClick={handleLogin}
          disabled={formNotValidValid || isLoading}
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
