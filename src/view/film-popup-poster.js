import {createElement} from "../utils";

const createFilmPopupPoster = (poster, ageRating) => {
  return `<div class="film-details__poster">
    <img class="film-details__poster-img" src="${poster}" alt="">
    <p class="film-details__age">${ageRating}</p>
  </div>`;
};

export default class FilmPopupPoster {
  constructor({poster, ageRating}) {
    this._element = null;
    this._poster = poster;
    this._ageRating = ageRating;
  }

  getTemaplte() {
    return createFilmPopupPoster(this._poster, this._ageRating);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemaplte());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
