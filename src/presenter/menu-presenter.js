import SiteMenuView from "../view/site-menu/site-menu";
import {render, RenderPosition} from "../utils/render";
import {MenuItem} from "../utils/constants";
import {remove} from "../utils/render";

export default class MenuPresenter {
  constructor(mainContainer, filmsModel, commentsModel, menuModel) {
    this._mainContainer = mainContainer;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._menuModel = menuModel;
    this._siteMenuView = null;
    this._isCommentsAvailable = true;

    this._render = this._render.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._commentsAvailabilityHandler = this._commentsAvailabilityHandler.bind(this);

    this._commentsModel.addObserver(this._commentsAvailabilityHandler);
    this._filmsModel.addObserver(this._render);
  }

  init() {
    this._render();
  }

  _commentsAvailabilityHandler(isInit) {
    if (isInit) {
      const comments = this._commentsModel.getComments();
      this._isCommentsAvailable = comments.length > 0;
      this._render();
    }
  }

  _render() {
    const prevSiteMenuComponent = this._siteMenuView;

    const sourceFilms = this._isCommentsAvailable ? this._filmsModel.films : [];

    this._siteMenuView = new SiteMenuView(this._menuModel.menuItem, sourceFilms);
    this._siteMenuView.setFilterChangeHandler(this._filterChangeHandler);

    if (prevSiteMenuComponent !== null) {
      remove(prevSiteMenuComponent);
    }

    render(this._mainContainer, this._siteMenuView, RenderPosition.AFTERBEGIN);
  }

  _filterChangeHandler(evt) {
    const hrefValue = evt.target.getAttribute(`href`);

    const clickedMenuItem = hrefValue ? hrefValue : evt.target.parentNode.getAttribute(`href`);

    const newMenuItem = Object.values(MenuItem).find((type) => clickedMenuItem.includes(type));

    this._menuModel.menuItem = newMenuItem;

    this._render();
  }
}
