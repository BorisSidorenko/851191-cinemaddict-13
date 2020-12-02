import {createElement} from "../../utils";
import {createFilmPopupInfoWrapTemplate} from "../film-popup-info-wrap/film-popup-info-wrap-template";

export default class FilmPopupInfoWrap {
  constructor() {
    this._element = null;
  }

  getTemaplte() {
    return createFilmPopupInfoWrapTemplate();
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.getTemaplte());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
