import AbstractView from "../view/abstract-component";

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  restoreHandlers() {
    throw new Error(`Abstract method is not implemented: restoreHandlers`);
  }

  updateElement() {
    let prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;
    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  updateData(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    this.updateElement();
  }
}
