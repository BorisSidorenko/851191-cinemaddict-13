import AbstractView from "../abstract-component";
import {createSiteMenuTemplate} from "../site-menu/site-menu-template";

export default class SiteMenu extends AbstractView {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._cards);
  }
}
