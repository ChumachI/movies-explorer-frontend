import { MainApiConfig } from "./MainApiConfig.js";

class MainApi {
  constructor(options) {
    this._commonUrlPart = options.commonUrlPart;
    this._headers = options.headers;
  }

  _checkResult(result) {
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._commonUrlPart}/users/me`, {
      headers: this._headers,
    }).then((result) => this._checkResult(result));
  }

  setProfileInfo(name, email) {
    return fetch(`${this._commonUrlPart}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`,
      }),
    }).then((result) => this._checkResult(result));
  }

  postNewMovie(card) {
    return fetch(`${this._commonUrlPart}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: card.country || 'Not defined',
        director: card.director || 'Not defined',
        duration: card.duration || 'Not defined',
        year: card.year || 'Not defined',
        description: card.description || 'Not defined',
        image: `${"https://api.nomoreparties.co/" + card.image.url}` || 'Not defined',
        trailerLink: card.trailerLink,
        thumbnail: `${"https://api.nomoreparties.co/" + card.image.url}` || 'Not defined',
        movieId: card.movieId || 'Not defined',
        nameRU: card.nameRU || 'Not defined',
        nameEN: card.nameEN || 'Not defined',
      }),
    }).then((result) => this._checkResult(result));
  }

  deleteSavedMovie(id) {
    if (!id) return;
    return fetch(`${this._commonUrlPart}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((result) => this._checkResult(result));
  }

  getAllMovies() {
    return fetch(`${this._commonUrlPart}/movies`, {
      headers: this._headers,
    }).then((result) => this._checkResult(result));
  }
}

export const mainApi = new MainApi(MainApiConfig);
