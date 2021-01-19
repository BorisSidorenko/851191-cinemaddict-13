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
    if (this._isOnline()) {
      return this._api.updateFilm(film)
        .then((updatedFilm) => {
          this._store.setItem(updatedFilm.id, updatedFilm);
          return updatedFilm;
        });
    }

    this._store.setItem(film.id, film);

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

    return Promise.reject(new Error(`Add new comment failed`));
  }

  _isOnline() {
    return navigator.onLine;
  }
}
