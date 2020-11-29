import {createElement} from "../utils";

const createFilmsCountTemplate = (count) => {
  return `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`;
};

export default class FilmsCount {
  constructor(count) {
    this._element = null;
    this._count = count;
  }

  getTemaplte() {
    return createFilmsCountTemplate(this._count);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemaplte());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
