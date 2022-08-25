import {MainApiConfig} from './MoviesApiConfig'
class MoviesApi {
  constructor(options) {
      this._commonUrlPart = options.commonUrlPart;
      this._headers = options.headers;
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
      headers: this._headers
    })
    .then(result => this._checkResult(result))
}

}

export const moviesApi = new MoviesApi(MainApiConfig);