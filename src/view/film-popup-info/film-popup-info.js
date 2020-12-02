import {createElement} from "../../utils";
import {createFilmPopupInfoTemplate} from "../film-popup-info/film-popup-info-template";

export default class FilmPopupInfo {
  constructor(card) {
    this._element = null;
    this._card = card;
  }

  getTemplate() {
    return createFilmPopupInfoTemplate(this._card);
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
