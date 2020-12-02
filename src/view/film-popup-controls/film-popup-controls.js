import {createElement} from "../../utils";
import {createFilmPopupControlsTemplate} from "../film-popup-controls/film-popup-controls-template";

export default class FilmPopupControls {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmPopupControlsTemplate();
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
