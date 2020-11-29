import {createElement} from "../utils";

const createFilmPopupInfoWrapTemplate = () => {
  return `<div class="film-details__info-wrap">
    </div>`;
};

export default class FilmPopupInfoWrap {
  constructor() {
    this._element = null;
  }

  getTemaplte() {
    return createFilmPopupInfoWrapTemplate();
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
