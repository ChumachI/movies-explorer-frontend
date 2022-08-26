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
import CurrentUserContext from "../../utils/context/currentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { auth } from "../../utils/Auth";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { useEffect } from "react";


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
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingErr, setLoadingErr] = useState(false);
  const [registrationErr, setRegistrationErr] = useState('');
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorPopupMessage, setErrorPopupMessage] = useState('')

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const newData = JSON.parse(localStorage.getItem("movies"));
      setCards(newData);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getAllMovies()
        .then((data) => {
          setSavedMovies(data.data);
        })
        .catch((err) => {
          setErrorPopupOpen(true);
          setErrorPopupMessage('Ошибка при получении сохраненных видео');
        });
    }
  }, [isLoggedIn, cards]);

  useEffect(() => {
    if(localStorage.getItem("jwt")){
    mainApi.getUserInfo().then((data) => {
      setCurrentUser(data.user);
    })
    .catch((err)=>{
      setErrorPopupOpen(true);
      setErrorPopupMessage('Ошибка при получении данных пользователя');
      console.log(err)

    })
  }
  }, [isLoggedIn]);

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  function tokenCheck() {
    
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        auth
          .getContent(jwt)
          .then((res) => {
            if (res) {
              setCurrentUser(res.user);
              setLoggedIn(true);
              history.push("/movies");
            }
          })
          .catch((err) => {
            setErrorPopupOpen(true);
            setErrorPopupMessage('Ошибка при получении данных пользователя');
            console.log(err)
          });
      }
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
        const ne = /^[a-zA-Zа-яА-Я -]*$/i;
        if (!ne.test(String(e.target.value))) {
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

  function handleRegistration(e) {
    e.preventDefault();
    const name = e.target.form.name.value;
    const email = e.target.form.email.value;
    const password = e.target.form.password.value;
    auth
      .register(email, password, name)
      .then(() => {
        history.push("/signin");
      })
      .catch((err) => {
        setRegistrationErr(err.message);
      });
  }

  function handleLogin(e) {
    e.preventDefault();
    const password = e.target.form.password.value;
    const email = e.target.form.email.value;
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        setErrorPopupOpen(true);
        setErrorPopupMessage('Произошла ошибка');
      });
  }

  function handleExit() {
    setEmail("");
    setName("");
    setPassword("");
    setPasswordError("");
    setEmailError("");
    history.push("/");
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  function showPopup() {
    setPopupShown(true);
  }

  function closePopup() {
    setPopupShown(false);
  }

  function closeErrorPopup(){
    setErrorPopupOpen(false);
    setErrorPopupMessage('');
  }

  function handleSearch() {
    setLoadingErr(false);
    setLoading(true);
    if (localStorage.getItem("movies")) {
      setLoading(false);
      return;
    }
    moviesApi
      .getAllMovies()
      .then((data) => {
        const newData = data.map((movie, index) => {
          const match = savedMovies.find((savedMovie) => {
            return savedMovie.nameRU === movie.nameRU;
          });
          movie.movieId = index;
          movie.lastChange = "search";
          if (match) {
            movie._id = match._id;
            movie.isLiked = true;
          } else {
            movie._id = null;
            movie.isLiked = false;
          }
          return movie;
        });
        localStorage.setItem("movies", JSON.stringify(newData));
        setCards(newData);

        setLoading(false);
      })
      .catch((err) => {
        setLoadingErr(true);
      });
  }

  function handleDeleteMovie(card) {
    const savedCopy = savedMovies.find((el) => {
      return el.nameRU === card.nameRU;
    });
    const indexOfDelistingStart = savedMovies.indexOf(savedCopy) - 2;
    return mainApi
      .deleteSavedMovie(savedCopy._id)
      .then((card) => {
        const newSavedData = savedMovies.splice(indexOfDelistingStart, 1);
        setSavedMovies(newSavedData);
        const newData = cards.map((el) => {
          if (el.movieId === card.data.movieId) {
            el.isLiked = false;
            el._id = null;
          }
          return el;
        });
        setCards(newData);
        localStorage.setItem("movies", JSON.stringify(newData));
      })
      .catch((err) => {
        setErrorPopupOpen(true);
        setErrorPopupMessage('Произошла ошибка при удалении фильма');
      });
  }

  function handleSaveMovie(card) {
    return mainApi
      .postNewMovie(card)
      .then((card) => {
        const copy = Object.assign([], savedMovies);
        copy.push(card.data);
        setSavedMovies(copy);
        const newData = cards.map((el) => {
          if (el.movieId === card.data.movieId) {
            el.isLiked = true;
            el._id = card.data._id;
          }
          return el;
        });
        setCards(newData);
        localStorage.setItem("movies", JSON.stringify(newData));
      })
      .catch((err) => {
        setErrorPopupOpen(true);
        setErrorPopupMessage('Произошла ошибка при сохранении фильма');
      });
  }

  function handleSubmitUserForm(e){
    e.preventDefault();
    mainApi.setProfileInfo(name, email)
    .then((data)=>{
      setCurrentUser({email: data.data.email, name:  data.data.email})
    })
    .catch(()=>{
      setErrorPopupOpen(true);
      setErrorPopupMessage('Произошла ошибка при изменении данных пользователя');
    })
    
  }

  return (
    <div className="app">
      <Header
        isPopupShown={isPopupShown}
        showPopup={showPopup}
        closePopup={closePopup}
      />
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/movies">
            <ProtectedRoute
              component={Movies}
              handleSearch={handleSearch}
              isLoading={isLoading}
              handleDeleteMovie={handleDeleteMovie}
              handleSaveMovie={handleSaveMovie}
              savedMovies={savedMovies}
              cards={cards}
              isLoggedIn={isLoggedIn}
              isLoadingErr={isLoadingErr}
            />
          </Route>
          <Route path="/saved-movies">
            <ProtectedRoute
              component={SavedMovies}
              cards={cards}
              handleDeleteMovie={handleDeleteMovie}
              isLoading={isLoading}
              savedMovies={savedMovies}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route path="/profile">
            <ProtectedRoute
              component={Profile}
              name={name}
              email={email}
              handleExit={handleExit}
              isLoggedIn={isLoggedIn}
              handleSubmitUserForm={handleSubmitUserForm}
              handleChange={handleChange}
              emailError={emailError}
              nameError={nameError}
              handleBlur={handleBlur}
              nameDirty={nameDirty}
              emailDirty={emailDirty}
            />
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
              registrationErr={registrationErr}
            />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
      <Footer />
      <ErrorPopup isErrorPopupOpen = {isErrorPopupOpen} errorPopupMessage = {errorPopupMessage} closeErrorPopup={closeErrorPopup}/>
    </div>
  );
}

export default App;
