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
        return films.filter(({user_details: userDetails}) => userDetails.watchlist);
      case MenuItem.HISTORY:
        return films.filter(({user_details: userDetails}) => userDetails.already_watched);
      case MenuItem.FAVORITES:
        return films.filter(({user_details: userDetails}) => userDetails.favorite);
    }

    return films;
  }

  sortFilms(films, sortType) {
    switch (sortType) {
      case SortType.DATE:
        return films.slice().sort((a, b) => dayjs(b.film_info.release.date).isAfter(dayjs(a.film_info.release.date)) ? 1 : -1);
      case SortType.RATING:
        return films.slice().sort((a, b) => b.film_info.total_rating - a.film_info.total_rating);
      case SortType.COMMENTS:
        return films.slice().sort((a, b) => b.comments.length - a.comments.length);
    }

    return films;
  }
}
