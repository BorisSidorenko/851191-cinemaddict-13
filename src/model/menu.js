import dayjs from "dayjs";
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
        return films.filter(({userDetails}) => userDetails.watchlist);
      case MenuItem.HISTORY:
        return films.filter(({userDetails}) => userDetails.alreadyWatched);
      case MenuItem.FAVORITES:
        return films.filter(({userDetails}) => userDetails.favorite);
    }

    return films;
  }

  sortFilms(films, sortType) {
    switch (sortType) {
      case SortType.DATE:
        return films.slice().sort((a, b) => dayjs(b.filmInfo.release.date).isAfter(dayjs(a.filmInfo.release.date)) ? 1 : -1);
      case SortType.RATING:
        return films.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    }

    return films;
  }
}
