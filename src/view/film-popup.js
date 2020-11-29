import {createElement} from "../utils";

const createFilmPopupTemplate = () => {
  return `<section class="film-details">
    </section>`;
};

export default class FilmPopup {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmPopupTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
