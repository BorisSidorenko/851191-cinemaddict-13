import AbstractView from "../abstract-component";
import {createSiteMenuTemplate} from "../site-menu/site-menu-template";

export default class SiteMenu extends AbstractView {
  constructor(menuItem, cards) {
    super();
    this._menuItem = menuItem;
    this._cards = cards;

    this._menuItemChangeHandler = this._menuItemChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._menuItem, this._cards);
  }

  _menuItemChangeHandler(evt) {
    evt.preventDefault();
    this._callback.menuItemChange(evt);
  }

  setFilterChangeHandler(callback) {
    this._callback.menuItemChange = callback;
    this.element.querySelector(`[href="#all"]`).addEventListener(`click`, this._menuItemChangeHandler);
    this.element.querySelector(`[href="#watchlist"]`).addEventListener(`click`, this._menuItemChangeHandler);
    this.element.querySelector(`[href="#history"]`).addEventListener(`click`, this._menuItemChangeHandler);
    this.element.querySelector(`[href="#favorites"]`).addEventListener(`click`, this._menuItemChangeHandler);
    this.element.querySelector(`[href="#stats"]`).addEventListener(`click`, this._menuItemChangeHandler);
  }
}
