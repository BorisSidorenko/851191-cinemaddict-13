import {createElement} from "../utils";

const createFilmPopupBottomContainerFormTemplate = () => {
  return `<div class="film-details__bottom-container">
    </div>`;
};

export default class FilmPopupForm {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmPopupBottomContainerFormTemplate();
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
