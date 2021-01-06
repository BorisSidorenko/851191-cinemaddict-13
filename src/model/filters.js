import Observer from "../utils/observer";
import {SortType, FilterType} from "../utils/constants";

export default class FiltersModel extends Observer {
  constructor() {
    super();
    this._filter = FilterType.ALL;
  }

  set filter(filterType) {
    this._filter = filterType;
    this._notify();
  }

  get filter() {
    return this._filter;
  }

  filterFilms(films, filterType) {
    switch (filterType) {
      case FilterType.WATCHLIST:
        return films.filter((film) => film.isWatchlist);
      case FilterType.HISTORY:
        return films.filter((film) => film.isHistory);
      case FilterType.FAVORITES:
        return films.filter((film) => film.isFavorite);
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
