import {createElement} from "../utils";

const createFilmPopupTopContainerFormTemplate = () => {
  return `<div class="film-details__top-container">
    </div>`;
};

export default class FilmPopupTopContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmPopupTopContainerFormTemplate();
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
