import AbstractView from "../abstract-component";
import {createFilmsListContainerTemplate} from "../films-list-container/films-list-container-template";

export default class FilmsListContainer extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmsListContainerTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(evt);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.element.addEventListener(`click`, this._clickHandler);
  }

  clearClickHandler() {
    this._callback.click = null;
    this.element.removeEventListener(`click`, this._clickHandler);
  }
}
