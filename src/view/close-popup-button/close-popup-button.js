import {createElement} from "../../utils";
import {createClosePopupButtonTemaplte} from "../close-popup-button/close-popup-button-template";


export default class ClosePopupButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createClosePopupButtonTemaplte();
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
