import Observer from "../utils/observer";
import loadash from "lodash";

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
    return loadash.cloneDeep(this._films);
  }

  updateFilm(filmToUpdate) {
    this._films.find((film, i) => {
      if (film.id === filmToUpdate.id) {
        this._films[i] = filmToUpdate;
      }
    });

    this._notify(filmToUpdate);
  }
}
