import AbstractView from "../abstract-component";
import {createSortTemplate} from "../sort/sort-template";

export default class Sort extends AbstractView {
  constructor(sortType) {
    super();
    this._sortType = sortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._sortType);
  }

  _sortTypeChangeHandler(evt) {
    const sortType = evt.target.dataset.sortType;

    if (sortType) {
      evt.preventDefault();
      this._callback.sortTypeChange(sortType);
    }
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
