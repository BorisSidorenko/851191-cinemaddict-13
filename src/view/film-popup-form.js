import {createElement} from "../utils";

const createFilmPopupFormTemplate = () => {
  return `<form class="film-details__inner" action="" method="get">
    </form>`;
};

export default class FilmPopupForm {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmPopupFormTemplate();
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
