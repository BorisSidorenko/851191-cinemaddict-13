import AbstractView from "../abstract-component";
import {createClosePopupButtonTemaplte} from "../close-popup-button/close-popup-button-template";

export default class ClosePopupButton extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createClosePopupButtonTemaplte();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
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
