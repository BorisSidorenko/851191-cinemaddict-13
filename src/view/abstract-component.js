import {createElement} from "../utils/render";
import {SHAKE_ANIMATION_TIMEOUT} from "../utils/constants";

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method is not implemented: getTemplate`);
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

  shakeElement() {
    this.element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.element.style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
