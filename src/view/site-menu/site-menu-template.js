import {FilterType} from "../../utils/constants";

export const createSiteMenuTemplate = (currentFilter, cards) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${currentFilter === FilterType.ALL ? `main-navigation__item--active` : ``}">All movies</a>
      <a href="#watchlist" class="main-navigation__item ${currentFilter === FilterType.WATCHLIST ? `main-navigation__item--active` : ``}">Watchlist <span class="main-navigation__item-count">${cards.filter((card) => card.isWatchlist === true).length}</span></a>
      <a href="#history" class="main-navigation__item ${currentFilter === FilterType.HISTORY ? `main-navigation__item--active` : ``}">History <span class="main-navigation__item-count">${cards.filter((card) => card.isHistory === true).length}</span></a>
      <a href="#favorites" class="main-navigation__item ${currentFilter === FilterType.FAVORITES ? `main-navigation__item--active` : ``}">Favorites <span class="main-navigation__item-count">${cards.filter((card) => card.isFavorite === true).length}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
