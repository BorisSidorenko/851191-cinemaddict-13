import ProfileView from "../view/profile/profile";
import SortView from "../view/sort/sort";
import FilmsWrapperView from "../view/films-wrapper/films-wrapper";
import FilmsListView from "../view/films-list/films-list";
import EmptyFilmsListView from "../view/films-list-empty/films-list-empty";
import FilmsListContainer from "../view/films-list-container/films-list-container";
import ShowMoreButtonView from "../view/show-more-button/show-more-button";
import FilmsCountView from "../view/films-count/films-count";
import StatsView from "../view/stats/stats";
import LoadingView from "../view/films-loading/films-loading";
import FilmPresenter from "./film-presenter";
import PopupPresenter from "./popup-presenter";

import {render, remove} from "../utils/render";
import {CARDS_TO_SHOW_COUNT} from "../utils/constants";
import {SortType, MenuItem} from "../utils/constants";

const filmsWrapperComponent = new FilmsWrapperView();
const filmsListComponent = new FilmsListView();
const emptyFilmsListComponent = new EmptyFilmsListView();
const filmsListContainerComponent = new FilmsListContainer();
const showMoreButtonComponent = new ShowMoreButtonView();
const loadingComponent = new LoadingView();
let showMoreButtonClickCounter = 1;

export default class FilmListPresenter {
  constructor(headerContainer, mainContainer, footerContainer, filmsModel, commentsModel, menuModel, apiWithProvider) {
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;
    this._footerContainer = footerContainer;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._menuModel = menuModel;
    this._apiWithProvider = apiWithProvider;
    this._showMoreButtonClickHandler = this._showMoreButtonClickHandler.bind(this);

    this._filmPresenter = {};
    this._filmPopupPresenter = {};
    this._filmChangeHandler = this._filmChangeHandler.bind(this);

    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._sortComponent = null;
    this._currentSortType = SortType.DEFAULT;
    this._currentMenuItem = this._menuModel.menuItem;
    this._filmsCountComponent = null;
    this._statsComponent = null;

    this._isLoading = true;
    this._shownFilmsCardsCount = null;

    this._menuItemChangeHandler = this._menuItemChangeHandler.bind(this);
    this._sortedListChangeHandler = this._sortedListChangeHandler.bind(this);
    this._commentsReadyHandler = this._commentsReadyHandler.bind(this);

    this._menuModel.addObserver(this._menuItemChangeHandler);
    this._menuModel.addObserver(this._sortedListChangeHandler);
    this._filmsModel.addObserver(this._filmChangeHandler);
    this._commentsModel.addObserver(this._commentsReadyHandler);
  }

  init() {
    this._render();
  }

  _commentsReadyHandler(isInit) {
    if (isInit) {
      this._isLoading = false;
      this._render();
    }
  }

  _renderProfile() {
    const films = this._getFilms();
    const profileComponent = new ProfileView(films);
    render(this._headerContainer, profileComponent);
  }

  _resetSort() {
    this._currentSortType = SortType.DEFAULT;
    this._renderSort();
  }

  _resetShowMoreButtonClickCounter() {
    showMoreButtonClickCounter = 1;
    this._shownFilmsCardsCount = showMoreButtonClickCounter * CARDS_TO_SHOW_COUNT;
  }

  _sortedListChangeHandler() {
    const films = this._getFilms(true);

    const filmsToShow = films.slice(0, this._shownFilmsCardsCount);

    this._renderFilmsCards(filmsToShow);
    this._renderShowMoreButton();
  }

  _menuItemChangeHandler() {
    if (this._currentMenuItem !== this._menuModel.menuItem) {
      this._currentMenuItem = this._menuModel.menuItem;
    }

    if (this._currentMenuItem !== MenuItem.STATS) {
      this._hideStats();
      this._resetSort();
      this._clearFilmListContainer();
      this._renderFilms();
      this._resetShowMoreButtonClickCounter();
    } else {
      remove(this._sortComponent);
      remove(filmsWrapperComponent);

      this._showStats();
    }
  }

  _hideStats() {
    if (this._statsComponent) {
      remove(this._statsComponent);
    }
  }

  _showStats() {
    const prevStatsComponent = this._statsComponent;

    if (prevStatsComponent !== null) {
      remove(prevStatsComponent);
    }

    const films = this._getFilms();
    this._statsComponent = new StatsView(films);
    render(this._mainContainer, this._statsComponent);
  }

  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType !== sortType) {
      this._currentSortType = sortType;

      this._renderSort();

      this._clearFilmListContainer();
      this._renderFilms();
    }
  }

  _getFilteredFlims(films) {
    return this._menuModel.filterFilms(films, this._currentMenuItem);
  }

  _getSortedFilms(films) {
    return this._menuModel.sortFilms(films, this._currentSortType);
  }

  _getFilms(applyFilterAndSort = false) {
    let {films} = this._filmsModel;

    if (applyFilterAndSort) {
      films = this._getFilteredFlims(films);
      films = this._getSortedFilms(films);
    }

    return films;
  }

  _getFilmCardComments(card) {
    return this._commentsModel.getFilmCardComments(card);
  }

  _renderSort() {
    const prevSortComponent = this._sortComponent;

    if (prevSortComponent !== null) {
      remove(prevSortComponent);
    }

    this._sortComponent = new SortView(this._currentSortType);
    render(this._mainContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  _renderFilmsWrapper() {
    render(this._mainContainer, filmsWrapperComponent);
  }

  _renderLoading() {
    this._renderFilmsWrapper();
    render(filmsWrapperComponent, loadingComponent);
    this._renderFilmsCount();
  }

  _checkFilmsAvailable() {
    if (this._getFilms().length === 0 || this._commentsModel.getComments().length === 0) {
      this._renderEmptyFilmsList();
      return false;
    } else {
      remove(emptyFilmsListComponent);
      return true;
    }
  }

  _render() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    } else {
      remove(loadingComponent);
      if (!this._checkFilmsAvailable()) {
        return;
      }
    }


    this._renderProfile();

    this._renderSort();

    this._renderFilms();

    this._renderFilmsCount();
  }

  _renderFilms() {
    this._renderFilmsWrapper();
    render(filmsWrapperComponent, filmsListComponent);

    this._renderFilmsListContainer();

    this._shownFilmsCardsCount = showMoreButtonClickCounter * CARDS_TO_SHOW_COUNT;
    this._renderFilmsCards(this._getFilms(true).slice(0, this._shownFilmsCardsCount));

    this._renderShowMoreButton();
  }

  _renderFilmsListContainer() {
    render(filmsListComponent, filmsListContainerComponent);
  }

  _addEmptyListToWrapper() {
    render(filmsWrapperComponent, emptyFilmsListComponent);
  }

  _renderEmptyFilmsList() {
    this._renderFilmsWrapper();

    this._addEmptyListToWrapper();

    this._renderFilmsCount();
  }

  _showMoreButtonClickHandler() {
    showMoreButtonClickCounter += 1;
    this._shownFilmsCardsCount = CARDS_TO_SHOW_COUNT * showMoreButtonClickCounter;

    const cardsToShow = this._getFilms(true).slice(0, this._shownFilmsCardsCount);

    this._renderFilmsCards(cardsToShow);

    if (cardsToShow.length === this._getFilms(true).length) {
      remove(showMoreButtonComponent);
    } else {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    if (this._getFilms(true).length > this._shownFilmsCardsCount) {
      render(filmsListComponent, showMoreButtonComponent);
      showMoreButtonComponent.setClickHandler(this._showMoreButtonClickHandler);
    }
  }

  _renderFilmsCount() {
    const films = this._getFilms();
    const availableFilmsCount = films ? films.length : 0;

    const prevFilmsCountComponent = this._filmsCountComponent;

    if (prevFilmsCountComponent) {
      remove(prevFilmsCountComponent);
    }

    this._filmsCountComponent = new FilmsCountView(availableFilmsCount);

    render(this._footerContainer, this._filmsCountComponent);
  }

  _renderFilmCard(cardToShow) {
    const paramObj = {
      filmsListContainer: filmsListContainerComponent,
      changeData: this._filmsModel.updateFilm,
      cardClick: this._filmCardClickHandler,
      apiWithProvider: this._apiWithProvider
    };

    const filmPresenter = new FilmPresenter(paramObj);
    const cardToShowCommentsLength = this._getFilmCardComments(cardToShow).length;
    filmPresenter.init(this._getFilms(), cardToShow, cardToShowCommentsLength);

    this._filmPresenter[cardToShow.id] = filmPresenter;
  }

  _renderFilmsCards(cardsToShow) {
    this._clearFilmListContainer();
    cardsToShow.forEach((cardToShow) => this._renderFilmCard(cardToShow));
  }

  _clearFilmListContainer() {
    const filmPresenters = Object.values(this._filmPresenter);

    if (filmPresenters.length > 0) {
      filmPresenters.forEach((presenter) => presenter.destroy());
      this._filmPresenter = {};

      remove(showMoreButtonComponent);
    }
  }

  _filmChangeHandler(updatedFilm) {
    if (updatedFilm) {
      const films = this._getFilms(true);
      const comments = this._getFilmCardComments(updatedFilm);
      const commentsCount = comments.length;
      const currentPresenter = this._filmPresenter[updatedFilm.id];

      currentPresenter.init(films, updatedFilm, commentsCount);

      const popupPresenter = this._filmPopupPresenter[updatedFilm.id];

      if (popupPresenter) {
        popupPresenter.init(updatedFilm);
      }

      this._renderFilmsCards(films.slice(0, this._shownFilmsCardsCount));
      this._renderShowMoreButton();
    }
  }

  _filmCardClickHandler(card) {
    const clickedCard = card;
    const clickedCardComments = this._getFilmCardComments(card);

    this._removedOpenedPopup();

    const paramObj = {
      mainContainer: this._mainContainer,
      changeData: this._filmsModel.updateFilm,
      commentsModel: this._commentsModel,
      apiWithProvider: this._apiWithProvider
    };

    const popupPresenter = new PopupPresenter(paramObj);

    popupPresenter.init(clickedCard, clickedCardComments);

    this._filmPopupPresenter[card.id] = popupPresenter;
  }

  _removedOpenedPopup() {
    const filmPopupPresenter = Object.values(this._filmPopupPresenter);

    if (filmPopupPresenter.length > 0) {
      filmPopupPresenter.forEach((presenter) => presenter.destroy());
      this._filmPopupPresenter = {};
    }
  }
}
