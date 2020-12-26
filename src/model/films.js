import Observer from "../utils/observer";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  set allFilms(films) {
    this._films = films.slice();
  }

  get allFilms() {
    return this._films;
  }

  updateFilm(filmToUpdate) {
    const indexToUpdate = this._films.findIndex((film) => film.id === filmToUpdate.id);

    if (indexToUpdate === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, indexToUpdate),
      filmToUpdate,
      ...this._films.slice(indexToUpdate + 1)
    ];

    this._notify();
  }
}
