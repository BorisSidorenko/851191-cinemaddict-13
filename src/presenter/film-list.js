import ProfileView from "../view/profile/profile";
import SortView from "../view/sort/sort";
import FilmsWrapperView from "../view/films/films";
import FilmsListView from "../view/films-list/films-list";
import EmptyFilmsListView from "../view/films-list-empty/films-list-empty";
import FilmsListContainer from "../view/films-list-container/films-list-container";
import ShowMoreButtonView from "../view/show-more-button/show-more-button";
import FilmsCountView from "../view/films-count/films-count";
import StatsView from "../view/stats/stats";
import FilmPresenter from "../presenter/film";
import PopupPresenter from "../presenter/popup";

import {render, remove} from "../utils/render";
import {CARDS_TO_SHOW_COUNT} from "../utils/constants";
import {SortType, MenuItem} from "../utils/constants";

const filmsWrapperComponent = new FilmsWrapperView();
const filmsListComponent = new FilmsListView();
const emptyFilmsListComponent = new EmptyFilmsListView();
const filmsListContainerComponent = new FilmsListContainer();
const showMoreButtonComponent = new ShowMoreButtonView();
let showMoreButtonClickCounter = 1;

export default class FilmListPresenter {
  constructor(headerContainer, mainContainer, footerContainer, filmsModel, commentsModel, menuModel) {
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;
    this._footerContainer = footerContainer;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._menuModel = menuModel;
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._filmPresenter = {};
    this._filmPopupPresenter = {};
    this._handleFilmChange = this._handleFilmChange.bind(this);

    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._sortComponent = null;
    this._currentSortType = SortType.DEFAULT;
    this._currentMenuItem = this._menuModel.menuItem;
    this._filmsCountComponent = null;
    this._statsComponent = null;

    this._handleMenuItemChange = this._handleMenuItemChange.bind(this);
    this._handleSortedListChange = this._handleSortedListChange.bind(this);
    this._handleCommentsReady = this._handleCommentsReady.bind(this);

    this._menuModel.addObserver(this._handleMenuItemChange);
    this._menuModel.addObserver(this._handleSortedListChange);
    this._filmsModel.addObserver(this._handleFilmChange);
    this._commentsModel.addObserver(this._handleCommentsReady);
  }

  init() {
    this._render();
  }

  _handleCommentsReady() {
    const films = this._getFilms();
    const comments = this._commentsModel.getAllComments();

    if (films.length === Object.keys(comments).length) {
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
  }

  _handleSortedListChange() {
    const films = this._getFilms(true);
    const filmsCountToShow = showMoreButtonClickCounter * CARDS_TO_SHOW_COUNT;
    const filmsToShow = films.slice(0, filmsCountToShow);

    this._renderFilmsCards(filmsToShow);
    this._renderShowMoreButton();
  }

  _handleMenuItemChange() {
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

  _handleSortTypeChange(sortType) {
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
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmsWrapper() {
    render(this._mainContainer, filmsWrapperComponent);
  }

  _render() {
    if (this._getFilms().length === 0) {
      this._renderEmptyFilmsList();
      return;
    } else {
      remove(emptyFilmsListComponent);
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
    this._renderFilmsCards(this._getFilms(true).slice(0, CARDS_TO_SHOW_COUNT));

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

  _handleShowMoreButtonClick() {
    showMoreButtonClickCounter += 1;

    const cardsToShow = this._getFilms(true).slice(0, CARDS_TO_SHOW_COUNT * showMoreButtonClickCounter);

    this._renderFilmsCards(cardsToShow);

    if (cardsToShow.length === this._getFilms(true).length) {
      remove(showMoreButtonComponent);
    } else {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    if (this._getFilms(true).length > CARDS_TO_SHOW_COUNT) {
      render(filmsListComponent, showMoreButtonComponent);
      showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
    }
  }

  _renderFilmsCount() {
    let films = this._getFilms();
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
      mainContainer: this._mainContainer,
      filmsListContainer: filmsListContainerComponent,
      changeData: this._filmsModel.updateFilm,
      cardClick: this._handleFilmCardClick
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

  _handleFilmChange(updatedFilm) {
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

      const shownFilmsCardsCount = CARDS_TO_SHOW_COUNT * showMoreButtonClickCounter;

      this._renderFilmsCards(films.slice(0, shownFilmsCardsCount));
    }
  }

  _handleFilmCardClick(card) {
    const clickedCard = card;
    const clickedCardComments = this._getFilmCardComments(card);

    this._removedOpenedPopup();

    const paramObj = {
      mainContainer: this._mainContainer,
      changeData: this._filmsModel.updateFilm,
      commentsModel: this._commentsModel
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
