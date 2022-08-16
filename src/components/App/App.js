import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import Footer from "../Footer/Footer";

import { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

function App() {
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
  const [isPopupShown, setPopupShown] = useState(false);
  //тестовый временный массив для демонстрации работы грида.
  const cards = [
    {
      image: require("../../images/1.png"),
      isLiked: true,
    },
    {
      image: require("../../images/2.png"),
      isLiked: true,
    },
    {
      image: require("../../images/3.png"),
      isLiked: true,
    },
    {
      image: require("../../images/4.png"),
      isLiked: false,
    },
    {
      image: require("../../images/5.png"),
      isLiked: false,
    },
    {
      image: require("../../images/6.png"),
      isLiked: false,
    },
    {
      image: require("../../images/7.png"),
      isLiked: false,
    },
    {
      image: require("../../images/8.png"),
      isLiked: false,
    },
    {
      image: require("../../images/9.png"),
      isLiked: false,
    },
    {
      image: require("../../images/10.png"),
      isLiked: false,
    },
    {
      image: require("../../images/11.png"),
      isLiked: true,
    },
    {
      image: require("../../images/12.png"),
      isLiked: false,
    },
    {
      image: require("../../images/12.png"),
      isLiked: false,
    },
  ];

  const history = useHistory();

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

  function handleChange(e) {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        const re =
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (!re.test(String(e.target.value).toLocaleLowerCase())) {
          setEmailError("Некорректный email");
        } else {
          setEmailError("");
        }
        break;
      case "password":
        setPassword(e.target.value);
        if (e.target.value.length < 8) {
          setPasswordError("Длина пароля должна быть не менее 8 символов");
        } else {
          setPasswordError("");
        }
        break;
      case "name":
        setName(e.target.value);
        if (e.target.value.length < 2) {
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

  function handleRegistration() {
    history.push("/signin");
  }

  function handleLogin() {
    history.push("/movies");
  }

  function handleExit() {
    setEmail("");
    setName("");
    setPassword("");
    setPasswordError('Поле "пароль" не может быть пустым');
    setEmailError('Поле "e-mail"  не может быть пустым');
    history.push("/signin");
  }

  function showPopup() {
    setPopupShown(true);
  }

  function closePopup() {
    setPopupShown(false);
  }

  return (
    <div className="app">
      <Header
        isPopupShown={isPopupShown}
        showPopup={showPopup}
        closePopup={closePopup}
      />
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/movies">
          <Movies cards={cards} />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies cards={cards} />
        </Route>
        <Route path="/profile">
          <Profile name={name} email={email} handleExit={handleExit} />
        </Route>
        <Route path="/signin">
          <Login
            handleChange={handleChange}
            handleBlur={handleBlur}
            emailDirty={emailDirty}
            passwordDirty={passwordDirty}
            email={email}
            password={password}
            passwordError={passwordError}
            emailError={emailError}
            handleLogin={handleLogin}
          />
        </Route>
        <Route path="/signup">
          <Register
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleRegistration={handleRegistration}
            nameDirty={nameDirty}
            emailDirty={emailDirty}
            passwordDirty={passwordDirty}
            name={name}
            email={email}
            password={password}
            passwordError={passwordError}
            emailError={emailError}
            nameError={nameError}
          />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
