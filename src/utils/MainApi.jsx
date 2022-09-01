class MainApi {
  constructor(options) {
    this._commonUrlPart = options.commonUrlPart;
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
    const token = localStorage.getItem('jwt');
    return fetch(`${this._commonUrlPart}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`,
      }),
    }).then((result) => this._checkResult(result));
  }

  postNewMovie(card) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._commonUrlPart}/movies`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: card.country || 'Not defined',
        director: card.director || 'Not defined',
        duration: card.duration || 'Not defined',
        year: card.year || 'Not defined',
        description: card.description || 'Not defined',
        image: `${"https://api.nomoreparties.co/" + card.image.url}` || 'Not defined',
        trailerLink: card.trailerLink,
        thumbnail: `${"https://api.nomoreparties.co/" + card.image.url}` || 'Not defined',
        movieId: card.id,
        nameRU: card.nameRU || 'Not defined',
        nameEN: card.nameEN || 'Not defined',
      }),
    }).then((result) => this._checkResult(result));
  }

  deleteSavedMovie(id) {
    if (!id) return;
    const token = localStorage.getItem('jwt');
    return fetch(`${this._commonUrlPart}/movies/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
    }).then((result) => this._checkResult(result));
  }

  getAllSavedMovies(token) {
    return fetch(`${this._commonUrlPart}/movies`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
    }).then((result) => this._checkResult(result));
  }
}

export const mainApi = new MainApi({
  commonUrlPart: 'https://api.movies.chumak.nomoredomains.xyz',
});
