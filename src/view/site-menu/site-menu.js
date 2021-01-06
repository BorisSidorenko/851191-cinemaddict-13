import AbstractView from "../abstract-component";
import {createSiteMenuTemplate} from "../site-menu/site-menu-template";

export default class SiteMenu extends AbstractView {
  constructor(filterType, cards) {
    super();
    this._filterType = filterType;
    this._cards = cards;

    this._handleFilterChange = this._handleFilterChange.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filterType, this._cards);
  }

  _handleFilterChange(evt) {
    evt.preventDefault();
    this._callback.filterChange(evt);
  }

  setFilterChangeHandler(callback) {
    this._callback.filterChange = callback;
    this.element.querySelector(`[href="#all"]`).addEventListener(`click`, this._handleFilterChange);
    this.element.querySelector(`[href="#watchlist"]`).addEventListener(`click`, this._handleFilterChange);
    this.element.querySelector(`[href="#history"]`).addEventListener(`click`, this._handleFilterChange);
    this.element.querySelector(`[href="#favorites"]`).addEventListener(`click`, this._handleFilterChange);
  }
}
