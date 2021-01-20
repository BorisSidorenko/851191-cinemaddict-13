import {toast} from "../utils/toast";

const adaptToStore = (items) => {
  return items.reduce((acc, current) => {
    acc[current.id] = current;
    return acc;
  }, {});
};

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

  getFilmComments(id) {
    if (this._isOnline()) {
      return this._api.getFilmComments(id)
        .then((comments) => {
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
        });
    }

    const filmsFromStore = Object.values(this._store.getItems());
    const filmComments = filmsFromStore[id].comments_info;

    return Promise.resolve(filmComments);
  }

  deleteComment({id, comments}, commentToDeleteId) {
    if (this._isOnline()) {
      return this._api.deleteComment(commentToDeleteId)
        .then(() => {
          const filmsFromStore = Object.values(this._store.getItems());
          const filmComments = filmsFromStore[id].comments_info;

          comments = comments.filter((commentId) => commentId !== commentToDeleteId);
          const updatedFilmComments = filmComments.filter((comment) => comment.id !== commentToDeleteId);

          const updatedFilmWithComments = Object.assign(
              {},
              filmsFromStore[id],
              {
                "comments": comments,
                "comments_info": updatedFilmComments
              }
          );

          this._store.setItem(id, updatedFilmWithComments);
        });
    }

    toast(`Sorry, you can't delete any comment being offline`);
    return Promise.reject(new Error(`Delete comment failed`));
  }

  addComment(filmId, localComment) {
    if (this._isOnline()) {
      return this._api.addComment(filmId, localComment)
        .then((data) => {
          const {movie, comments} = data;

          const filmsFromStore = Object.values(this._store.getItems());
          const updatedFilmWithComments = Object.assign(
              {},
              filmsFromStore[movie.id],
              {
                "comments": movie.comments,
                "comments_info": comments
              }
          );

          this._store.setItem(movie.id, updatedFilmWithComments);

          return data;
        });
    }

    toast(`Sorry, you can't add new comment being offline`);
    return Promise.reject(new Error(`Add new comment failed`));
  }

  sync() {
    if (this._isOnline()) {
      const filmsFromStore = Object.values(this._store.getItems());
      const filmsToSync = filmsFromStore.filter((film) => film.sync_nedeed);

      return this._api.sync(filmsToSync)
        .then(({updated}) => {
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

        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  _isOnline() {
    return navigator.onLine;
  }
}
