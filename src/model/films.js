import Observer from "../utils/observer";
import clonedeep from "lodash.clonedeep";

export default class FilmsModel extends Observer {
  constructor() {
    super();
    this._films = [];
    this.updateFilm = this.updateFilm.bind(this);
  }

  set films(films) {
    this._films = films.slice();
  }

  get films() {
    return clonedeep(this._films);
  }

  updateFilm(filmToUpdate) {
    const updatedFilms = this._films.map((film) => film.id === filmToUpdate.id ? filmToUpdate : film);
    this._films = updatedFilms;

    this._notify(filmToUpdate);
  }
}
