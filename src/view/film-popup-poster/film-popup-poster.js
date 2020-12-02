import {createElement} from "../../utils";
import {createFilmPopupPoster} from "../film-popup-poster/film-popup-poster-template";

export default class FilmPopupPoster {
  constructor({poster, ageRating}) {
    this._element = null;
    this._poster = poster;
    this._ageRating = ageRating;
  }

  getTemaplte() {
    return createFilmPopupPoster(this._poster, this._ageRating);
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.getTemaplte());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
