class MoviesApi {
  constructor() {
      this._commonUrlPart = 'https://api.nomoreparties.co/beatfilm-movies';
  }
  _checkResult(result) {
    if (result.ok) {
      return result.json();
    }
    else {
     return Promise.reject(`Ошибка: ${result.status}`);
    } 
}

  getAllMovies() {
    return fetch(`${this._commonUrlPart}`, {
    })
    .then(result => this._checkResult(result))
}

}

export const moviesApi = new MoviesApi();