import {createElement} from "../../utils";
import {createFilmPopupBottomContainerFormTemplate} from "../film-popup-bottom-container/film-popup-bottom-container-template";

export default class FilmPopupForm {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmPopupBottomContainerFormTemplate();
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
