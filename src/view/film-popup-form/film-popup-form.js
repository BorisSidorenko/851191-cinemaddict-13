import {createElement} from "../../utils";
import {createFilmPopupFormTemplate} from "../film-popup-form/film-popup-form-template";

export default class FilmPopupForm {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmPopupFormTemplate();
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
