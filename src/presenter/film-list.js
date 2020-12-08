import SiteFilterView from "../view/site-menu";
import SortView from "../view/sort/sort";
import FilmsWrapperView from "../view/films/films";
import FilmsListView from "../view/films-list/films-list";
import EmptyFilmsListView from "../view/films-list-empty/films-list-empty";
import FilmsListContainer from "../view/films-list-container/films-list-container";
import ShowMoreButtonView from "../view/show-more-button/show-more-button";
import FilmsCountView from "../view/films-count/films-count";

export default class FilmList {
  constructor() {
    this._filterComponent = new SiteFilterView();
    this._sortComponent = new SortView();
    this._filmsWrapperComponent = new FilmsWrapperView();
    this._filmsListComponent = new FilmsListView();
    this._emptyFilmsListComponent = new EmptyFilmsListView();
    this._filmsListContainerComponent = new FilmsListContainer();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._filmsCountComponent = new FilmsCountView();
  }

  init(filmCards) {

  }

  _renderFilter() {

  }

  _renderSort() {

  }

  _renderFilmsWrapper() {

  }

  _renderFilmsList() {

  }

  _renderFilmsListContainer() {

  }

  _renderEmptyFilmsList() {

  }

  _renderShowMoreButton() {

  }

  _renderFilmsCount() {

  }

  _appendFilmCards() {

  }
}
