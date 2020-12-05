import AbstractView from "../abstract-component";
import {createFilmsCountTemplate} from "../films-count/films-count-template";

export default class FilmsCount extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createFilmsCountTemplate(this._count);
  }
}
