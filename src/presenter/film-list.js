import ProfileView from "../view/profile/profile";
import SiteFilterView from "../view/site-menu";
import SortView from "../view/sort/sort";
import FilmsWrapperView from "../view/films/films";
import FilmsListView from "../view/films-list/films-list";
import EmptyFilmsListView from "../view/films-list-empty/films-list-empty";
import FilmsListContainer from "../view/films-list-container/films-list-container";
import ShowMoreButtonView from "../view/show-more-button/show-more-button";
import FilmsCountView from "../view/films-count/films-count";
import {getRandomIntInRange} from "../utils/common";
import {render, RenderPosition} from "../utils/render";

const CARDS_TO_SHOW_COUNT = 5;

const MIN_PROFILE_RANK = 0;
const MAX_PROFILE_RANK = 40;

export default class FilmList {
  constructor(headerContainer, mainContainer) {
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;
    this._profileComponent = new ProfileView(getRandomIntInRange(MAX_PROFILE_RANK, MIN_PROFILE_RANK));
    this._filterComponent = new SiteFilterView();
    this._sortComponent = new SortView();
    this._filmsWrapperComponent = new FilmsWrapperView();
    this._filmsListComponent = new FilmsListView();
    this._emptyFilmsListComponent = new EmptyFilmsListView();
    this._filmsListContainerComponent = new FilmsListContainer();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._filmsCountComponent = new FilmsCountView();
    this._filmsCards = null;
  }

  init(filmsCards) {
    this._filmsCards = filmsCards.slice();

    this._renderProfile();

    this._renderFilmsList();
  }

  _renderProfile() {
    render(this._headerContainer, this._profileComponent);
  }

  _renderFilter() {
    render(this._mainContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._mainContainer, this._sortComponent);
  }

  _renderFilmsWrapper() {

  }

  _renderFilmsList() {
    if (this._filmsCards.length > 0) {
      this._renderEmptyFilmsList();
      return;
    }

    this._renderSort();
    this._renderFilter();

    this._renderFilmCards(this._filmsCards.slice(0, CARDS_TO_SHOW_COUNT));

    if (this._filmsCards.length > CARDS_TO_SHOW_COUNT) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmsListContainer() {

  }

  _renderEmptyFilmsList() {

  }

  _renderShowMoreButton() {

  }

  _renderFilmsCount() {

  }

  _renderFilmsCards() {

  }
}
