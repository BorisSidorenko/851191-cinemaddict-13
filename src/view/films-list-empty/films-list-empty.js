import {createElement} from "../../utils";
import {createFilmsListEmptyTemplate} from "../films-list-empty/films-list-empty-template";

export default class EmptyFilmsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListEmptyTemplate();
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
