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

    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleCommentsAvailability = this._handleCommentsAvailability.bind(this);

    this._commentsModel.addObserver(this._handleCommentsAvailability);
  }

  init() {
    this._render();
  }

  _handleCommentsAvailability() {
    const comments = this._commentsModel.getComments();
    this._isCommentsAvailable = comments.length > 0;
    this._render();
  }

  _render() {
    const prevSiteMenuComponent = this._siteMenuView;

    const sourceFilms = this._isCommentsAvailable ? this._filmsModel.films : [];

    this._siteMenuView = new SiteMenuView(this._menuModel.menuItem, sourceFilms);
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
