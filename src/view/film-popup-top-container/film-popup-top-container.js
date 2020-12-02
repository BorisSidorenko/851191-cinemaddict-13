import {createElement} from "../../utils";
import {createFilmPopupTopContainerFormTemplate} from "../film-popup-top-container/film-popup-top-container-template";

export default class FilmPopupTopContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmPopupTopContainerFormTemplate();
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
