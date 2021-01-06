import SiteMenuView from "../view/site-menu/site-menu";
import {render, RenderPosition} from "../utils/render";
import {MenuItem} from "../utils/constants";
import {remove} from "../utils/render";

export default class MenuPresenter {
  constructor(mainContainer, filmsModel, menuModel) {
    this._mainContainer = mainContainer;
    this._filmsModel = filmsModel;
    this._menuModel = menuModel;
    this._siteMenuView = null;

    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._render = this._render.bind(this);
    this._filmsModel.addObserver(this._render);
  }

  init() {
    this._render();
  }

  _render() {
    const prevSiteMenuComponent = this._siteMenuView;

    this._siteMenuView = new SiteMenuView(this._menuModel.menuItem, this._filmsModel.films);
    this._siteMenuView.setFilterChangeHandler(this._handleFilterChange);

    if (prevSiteMenuComponent !== null) {
      remove(prevSiteMenuComponent);
    }

    render(this._mainContainer, this._siteMenuView, RenderPosition.AFTERBEGIN);
  }

  _handleFilterChange(evt) {
    const hrefValue = evt.target.getAttribute(`href`);

    const clickedMenuItem = hrefValue ? hrefValue : evt.target.parentNode.getAttribute(`href`);

    const newMenuItem = Object.values(MenuItem).find((type) => clickedMenuItem.includes(type));

    this._menuModel.menuItem = newMenuItem;

    this._render();
  }
}
