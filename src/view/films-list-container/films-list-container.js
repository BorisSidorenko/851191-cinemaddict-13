import {createElement} from "../../utils";
import {createFilmsListContainerTemplate} from "../films-list-container/films-list-container-template";

export default class FilmsListContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListContainerTemplate();
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
