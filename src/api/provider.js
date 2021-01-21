import {toast} from "../utils/toast";

const adaptToStore = (items) => items.reduce((acc, current) => {
  acc[current.id] = current;
  return acc;
}, {});

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._syncNedeed = false;
  }

  get isSyncNedeed() {
    return this._syncNedeed;
  }

  getFilms() {
    if (this._isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = adaptToStore(films);
          this._store.setItems(items);
          return films;
        });
    }

    const filmsFromStore = Object.values(this._store.getItems());

    return Promise.resolve(filmsFromStore);
  }

  updateFilm(film) {
    const filmsFromStore = Object.values(this._store.getItems());

    if (this._isOnline()) {
      return this._api.updateFilm(film)
        .then((updatedFilm) => {
          const filmToUpdateInStore = Object.assign(
              {},
              filmsFromStore[updatedFilm.id],
              updatedFilm
          );

          this._store.setItem(updatedFilm.id, filmToUpdateInStore);

          return updatedFilm;
        });
    }

    const filmToUpdateInStore = Object.assign(
        {},
        filmsFromStore[film.id],
        film,
        {
          "sync_nedeed": true
        }
    );

    this._store.setItem(film.id, filmToUpdateInStore);

    this._syncNedeed = true;

    return Promise.resolve(film);
  }

  _appendStoreWithComments(id, comments) {
    const filmsFromStore = Object.values(this._store.getItems());

    const filmWithComments = Object.assign(
        {},
        filmsFromStore[id],
        {
          "comments_info": comments
        }
    );

    this._store.setItem(id, filmWithComments);

    return comments;
  }

  getFilmComments(id) {
    if (this._isOnline()) {
      return this._api.getFilmComments(id)
        .then((comments) => this._appendStoreWithComments(id, comments));
    }

    const filmsFromStore = Object.values(this._store.getItems());
    const filmComments = filmsFromStore[id].comments_info;

    return Promise.resolve(filmComments);
  }

  _deleteCommentFromStore(id, comments, commentToDeleteId) {
    const filmsFromStore = Object.values(this._store.getItems());
    const filmComments = filmsFromStore[id].comments_info;

    comments = comments.filter((commentId) => commentId !== commentToDeleteId);
    const updatedFilmComments = filmComments.filter((comment) => comment.id !== commentToDeleteId);

    const updatedFilmWithComments = this._getUpdatedFilmComments(id, comments, updatedFilmComments);

    this._store.setItem(id, updatedFilmWithComments);
  }

  deleteComment({id, comments}, commentToDeleteId) {
    if (this._isOnline()) {
      return this._api.deleteComment(commentToDeleteId)
        .then(() => this._deleteCommentFromStore(id, comments, commentToDeleteId));
    }

    toast(`Sorry, you can't delete any comment being offline`);
    return Promise.reject(new Error(`Delete comment failed`));
  }

  _addCommentToStore(data) {
    const {movie, comments} = data;

    const updatedFilmWithComments = this._getUpdatedFilmComments(movie.id, movie.comments, comments);

    this._store.setItem(movie.id, updatedFilmWithComments);

    return data;
  }

  _getUpdatedFilmComments(filmId, commentIds, comments) {
    const filmsFromStore = Object.values(this._store.getItems());

    return Object.assign(
        {},
        filmsFromStore[filmId],
        {
          "comments": commentIds,
          "comments_info": comments
        }
    );
  }

  addComment(filmId, localComment) {
    if (this._isOnline()) {
      return this._api.addComment(filmId, localComment)
        .then((data) => this._addCommentToStore(data));
    }

    toast(`Sorry, you can't add new comment being offline`);
    return Promise.reject(new Error(`Add new comment failed`));
  }

  _syncStore(filmsFromStore, updated) {
    this._syncNedeed = false;

    updated.forEach((updatedFilm) => {
      const adaptToStoreFilm = Object.assign(
          {},
          filmsFromStore[updatedFilm.id],
          updatedFilm
      );

      delete adaptToStoreFilm.sync_nedeed;

      this._store.setItem(updatedFilm.id, adaptToStoreFilm);
    });
  }

  sync() {
    if (this._isOnline()) {
      const filmsFromStore = Object.values(this._store.getItems());
      const filmsToSync = filmsFromStore.filter((film) => film.sync_nedeed);

      return this._api.sync(filmsToSync)
        .then(({updated}) => this._syncStore(filmsFromStore, updated));
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  _isOnline() {
    return navigator.onLine;
  }
}
