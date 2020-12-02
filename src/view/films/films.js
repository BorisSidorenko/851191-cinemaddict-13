import {createElement} from "../../utils";
import {createFilmsWrapperTemplate} from "../films/films-template";

export default class FilmsWrapper {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsWrapperTemplate();
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
