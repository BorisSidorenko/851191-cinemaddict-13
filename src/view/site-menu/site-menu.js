import {createElement} from "../../utils";
import {createSiteMenuTemplate} from "../site-menu/site-menu-template";

export default class SiteMenu {
  constructor(cards) {
    this._element = null;
    this._cards = cards;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._cards);
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
