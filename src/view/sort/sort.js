import AbstractView from "../abstract-component";
import {createSortTemplate} from "../sort/sort-template";

export default class Sort extends AbstractView {
  constructor() {
    super();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _handleSortTypeChange(evt) {
    const sortType = evt.target.dataset.sortType;

    if (sortType) {
      evt.preventDefault();
      this._callback.sortTypeChange(sortType);
    }
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener(`click`, this._handleSortTypeChange);
  }
}
