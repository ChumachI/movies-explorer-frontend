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
import InfoPopup from "../InfoPopup/InfoPopup";
import { useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { auth } from "../../utils/Auth";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { useEffect } from "react";

function App() {
  const [isPopupShown, setPopupShown] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingErr, setLoadingErr] = useState(false);
  const [registrationErrMessage, setRegistrationErrMessage] = useState("");
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [infoPopupMessage, setInfoPopupMessage] = useState("");
  const [infoPopupStatus, setInfopopupStatus] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("movie")) {
      const allCards = JSON.parse(localStorage.getItem("movie"));
      setCards(allCards);
    }
  }, []);

  useEffect(() => {
    loadSavedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const newCards = JSON.parse(localStorage.getItem("movies"));
      setCards(newCards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            setInfoPopupOpen(true);
            setInfopopupStatus(false);
            setInfoPopupMessage("Ошибка при получении данных пользователя");
          });
      }
    }
  }

  function loadAllMovies() {
    if (localStorage.getItem("movies")) {
      const newData = JSON.parse(localStorage.getItem("movies"));
      setCards(newData);
    } else {
      moviesApi
        .getAllMovies()
        .then((data) => {
          setCards(data);
        })
        .catch(() => {
          setLoadingErr(true);
        });
    }
  }

  function loadSavedMovies() {
    if (isLoggedIn) {
      const token = localStorage.getItem("jwt");
      mainApi
        .getAllSavedMovies(token)
        .then((data) => {
          const mySavedMovies = data.data.filter((el) => {
            return el.owner === currentUser._id;
          });
          setSavedMovies(mySavedMovies);
        })
        .catch((err) => {
          setInfoPopupOpen(true);
          setInfopopupStatus(false);
          setInfoPopupMessage("Ошибка при получении сохраненных видео");
        });
    }
  }

  function handleRegistration(e) {
    e.preventDefault();
    const name = e.target.form.name.value;
    const email = e.target.form.email.value;
    const password = e.target.form.password.value;
    auth
      .register(email, password, name)
      .then((res) => {
        auth
          .login(email, password)
          .then((data) => {
            if (data.token) {
              setLoggedIn(true);
              history.push("/movies");
            }
          })
          .catch((err) => {
            setInfoPopupOpen(true);
            setInfopopupStatus(false);
            setInfoPopupMessage("Произошла ошибка");
          });
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          setRegistrationErrMessage(
            "Пользователь с таким Email уже зарегистрирован"
          );
        } else {
          setRegistrationErrMessage("Произошла ошибка при регистрации");
        }
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
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        setInfoPopupOpen(true);
        setInfopopupStatus(false);
        setInfoPopupMessage("Произошла ошибка");
      });
  }

  function handleExit() {
    localStorage.removeItem("jwt");
    history.push("/");
    setLoggedIn(false);
  }

  function showPopup() {
    setPopupShown(true);
  }

  function closePopup() {
    setPopupShown(false);
  }

  function closeInfoPopup() {
    setInfoPopupOpen(false);
  }

  function handleSearch() {
    setLoading(true);
    if (localStorage.getItem("movies")) {
      setLoading(false);
      return Promise.resolve();
    } else {
      return moviesApi.getAllMovies().then((data) => {
        setCards(data);
        localStorage.setItem("movies", JSON.stringify(data));
        setLoading(false);
      });
    }
  }

  function handleDeleteMovie(card) {
    loadSavedMovies();
    const targetCard = savedMovies.find((savedMovie) => {
      return savedMovie.movieId === card.id;
    });
    return mainApi
      .deleteSavedMovie(targetCard._id)
      .then((card) => {
        const newCards = cards.map((movie) => {
          if (card.data.nameRU === movie.nameRU) {
            movie.isLiked = false;
          }
          return movie;
        });
        setCards(newCards);
        localStorage.setItem("movies", JSON.stringify(newCards));
        loadSavedMovies();
      })
      .catch(() => {
        setInfoPopupMessage("Произошла ошибка при удалении видео");
        setInfopopupStatus(false);
        setInfoPopupOpen(true);
      });
  }

  function handleSaveMovie(card) {
    return mainApi
      .postNewMovie(card)
      .then((card) => {
        loadSavedMovies();
        const newCards = cards.map((movie) => {
          if (card.data.nameRU === movie.nameRU) {
            movie.isLiked = true;
          }
          return movie;
        });
        setCards(newCards);
        localStorage.setItem("movies", JSON.stringify(newCards));
      })
      .catch((err) => {
        setInfoPopupMessage("Произошла ошибка при сохранении видео " + err);
        setInfopopupStatus(false);
        setInfoPopupOpen(true);
      });
  }

  function handleSubmitUserUpdate(e) {
    const name = e.target.form.name.value;
    const email = e.target.form.email.value;
    mainApi
      .setProfileInfo(name, email)
      .then((data) => {
        setCurrentUser(data.data);
        setInfoPopupOpen(true);
        setInfopopupStatus(true);
        setInfoPopupMessage("Данные успешно обновлены!");
      })
      .catch((err) => {
        setInfoPopupOpen(true);
        setInfopopupStatus(false);
        setInfoPopupMessage("Произошла ошибка при редактировании профиля");
      });
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
              loadAllMovies={loadAllMovies}
              loadSavedMovies={loadSavedMovies}
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
              handleExit={handleExit}
              isLoggedIn={isLoggedIn}
              handleSubmitUserUpdate={handleSubmitUserUpdate}
            />
          </Route>

          <Route path="*">
            <PageNotFound history={history} />
          </Route>

          <Route path="/signin">
            {isLoggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Login handleLogin={handleLogin} />
            )}
          </Route>

          <Route path="/signup">
            {isLoggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register
                handleRegistration={handleRegistration}
                registrationErrMessage={registrationErrMessage}
              />
            )}
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
      <Footer />
      <InfoPopup
        isInfoPopupOpen={isInfoPopupOpen}
        infoPopupMessage={infoPopupMessage}
        closeInfoPopup={closeInfoPopup}
        infoPopupStatus={infoPopupStatus}
      />
    </div>
  );
}

export default App;
