import {createElement} from "../../utils";
import {createFilmPopupTemplate} from "../film-popup/film-popup-template";

export default class FilmPopup {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmPopupTemplate();
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
