import Observer from "../utils/observer";
import {SortType, MenuItem} from "../utils/constants";

export default class SiteMenuModel extends Observer {
  constructor() {
    super();
    this._menuItem = MenuItem.ALL;
  }

  set menuItem(menuItem) {
    this._menuItem = menuItem;
    this._notify();
  }

  get menuItem() {
    return this._menuItem;
  }

  filterFilms(films, menuItem) {
    switch (menuItem) {
      case MenuItem.WATCHLIST:
        return films.filter(({userDetails}) => userDetails.isWatchlist);
      case MenuItem.HISTORY:
        return films.filter(({userDetails}) => userDetails.isHistory);
      case MenuItem.FAVORITES:
        return films.filter(({userDetails}) => userDetails.isFavorite);
    }

    return films;
  }

  sortFilms(films, sortType) {
    switch (sortType) {
      case SortType.DATE:
        return films.slice().sort((a, b) => b.year - a.year);
      case SortType.RATING:
        return films.slice().sort((a, b) => b.rating - a.rating);
    }

    return films;
  }
}
