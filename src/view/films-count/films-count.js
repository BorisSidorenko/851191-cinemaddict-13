import {createElement} from "../../utils";
import {createFilmsCountTemplate} from "../films-count/films-count-template";

export default class FilmsCount {
  constructor(count) {
    this._element = null;
    this._count = count;
  }

  getTemaplte() {
    return createFilmsCountTemplate(this._count);
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
