import {createElement} from "../utils";

const createClosePopupButtonTemaplte = () => {
  return `<div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
  </div>`;
};

export default class ClosePopupButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createClosePopupButtonTemaplte();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
