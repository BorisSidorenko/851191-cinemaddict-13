export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    return this._api.getFilms();
  }

  updateFilm(film) {
    return this._api.updateFilm(film);
  }

  getFilmComments(id) {
    return this._api.getFilmComments(id);
  }

  deleteComment(id) {
    return this._api.deleteComment(id);
  }

  addComment(filmId, localComment) {
    return this._api.addComment(filmId, localComment);
  }

  _isOnline() {
    return navigator.onLine;
  }
}
