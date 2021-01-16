import AbstractView from "../abstract-component";
import {createFilmPopupPoster} from "../film-popup-poster/film-popup-poster-template";

export default class FilmPopupPoster extends AbstractView {
  constructor({poster, age_rating: ageRating}) {
    super();
    this._poster = poster;
    this._ageRating = ageRating;
  }

  getTemplate() {
    return createFilmPopupPoster(this._poster, this._ageRating);
  }
}
