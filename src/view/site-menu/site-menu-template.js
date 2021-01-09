import {MenuItem} from "../../utils/constants";

export const createSiteMenuTemplate = (currentMenuItem, cards) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${currentMenuItem === MenuItem.ALL ? `main-navigation__item--active` : ``}">All movies</a>
      <a href="#watchlist" class="main-navigation__item ${currentMenuItem === MenuItem.WATCHLIST ? `main-navigation__item--active` : ``}">Watchlist <span class="main-navigation__item-count">${cards.filter((card) => card.userDetails.isWatchlist === true).length}</span></a>
      <a href="#history" class="main-navigation__item ${currentMenuItem === MenuItem.HISTORY ? `main-navigation__item--active` : ``}">History <span class="main-navigation__item-count">${cards.filter((card) => card.userDetails.isHistory === true).length}</span></a>
      <a href="#favorites" class="main-navigation__item ${currentMenuItem === MenuItem.FAVORITES ? `main-navigation__item--active` : ``}">Favorites <span class="main-navigation__item-count">${cards.filter((card) => card.userDetails.isFavorite === true).length}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional ${currentMenuItem === MenuItem.STATS ? `main-navigation__item--active` : ``}">Stats</a>
  </nav>`;
};
