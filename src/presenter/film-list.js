import ProfileView from "../view/profile/profile";
import SortView from "../view/sort/sort";
import FilmsWrapperView from "../view/films/films";
import FilmsListView from "../view/films-list/films-list";
import EmptyFilmsListView from "../view/films-list-empty/films-list-empty";
import FilmsListContainer from "../view/films-list-container/films-list-container";
import ShowMoreButtonView from "../view/show-more-button/show-more-button";
import FilmsCountView from "../view/films-count/films-count";
import FilmPresenter from "../presenter/film";
import PopupPresenter from "../presenter/popup";

import {getRandomIntInRange} from "../utils/common";
import {render, remove} from "../utils/render";
import {ProfileRank, CARDS_TO_SHOW_COUNT} from "../utils/constants";
import {SortType} from "../utils/constants";

const profileComponent = new ProfileView(getRandomIntInRange(ProfileRank.MAX, ProfileRank.MIN));
const filmsWrapperComponent = new FilmsWrapperView();
const filmsListComponent = new FilmsListView();
const emptyFilmsListComponent = new EmptyFilmsListView();
const filmsListContainerComponent = new FilmsListContainer();
const showMoreButtonComponent = new ShowMoreButtonView();
let showMoreButtonClickCounter = 1;

export default class FilmListPresenter {
  constructor(headerContainer, mainContainer, footerContainer, filmsModel, commentsModel, filtersModel) {
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;
    this._footerContainer = footerContainer;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._filtersModel = filtersModel;
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._filmPresenter = {};
    this._filmPopupPresenter = {};
    this._handleFilmChange = this._handleFilmChange.bind(this);

    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._sortComponent = null;
    this._currentSortType = SortType.DEFAULT;
    this._currentFilterType = this._filtersModel.filter;

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleSortedListChange = this._handleSortedListChange.bind(this);
    this._filtersModel.addObserver(this._handleFilterTypeChange);
    this._filmsModel.addObserver(this._handleFilmChange);
    this._filmsModel.addObserver(this._handleSortedListChange);
  }

  init() {
    this._render();
  }

  _renderProfile() {
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
    let films = this._getFilms(true);
    let filmsToShow = films.slice(0, showMoreButtonClickCounter * CARDS_TO_SHOW_COUNT);
    this._renderFilmsCards(filmsToShow);
    this._renderShowMoreButton();
  }

  _handleFilterTypeChange() {
    if (this._currentFilterType !== this._filtersModel.filter) {
      this._currentFilterType = this._filtersModel.filter;
    }

    this._resetSort();
    this._clearFilmListContainer();
    this._renderFilms();
    this._resetShowMoreButtonClickCounter();
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
    return this._filtersModel.filterFilms(films, this._currentFilterType);
  }

  _getSortedFilms(films) {
    return this._filtersModel.sortFilms(films, this._currentSortType);
  }

  _getFilms(applyFilterAndSort = false) {
    let films = this._filmsModel.films;

    if (applyFilterAndSort) {
      films = this._getFilteredFlims(films);
      films = this._getSortedFilms(films);
    }

    return films;
  }

  _getComments() {
    return this._commentsModel.comments;
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
    const filmsCountComponent = new FilmsCountView(availableFilmsCount);
    render(this._footerContainer, filmsCountComponent);
  }

  _renderFilmCard(cardToShow) {
    const comments = this._getComments();
    const filmPresenter = new FilmPresenter(comments, this._mainContainer, filmsListContainerComponent, this._filmsModel.updateFilm, this._handleFilmCardClick);
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
    const comments = this._getFilmCardComments(updatedFilm);
    this._filmPresenter[updatedFilm.id].init(this._getFilms(), updatedFilm, comments.length);

    const popupPresenterExists = this._filmPopupPresenter[updatedFilm.id];
    if (popupPresenterExists) {
      this._filmPopupPresenter[updatedFilm.id].init(updatedFilm);
    }
  }

  _getFilmCardComments({id}) {
    const allComments = this._getComments();
    return allComments[id];
  }

  _handleFilmCardClick(card) {
    const clickedCard = card;
    const clickedCardComments = this._getFilmCardComments(card);

    this._removedOpenedPopup();

    const popupPresenter = new PopupPresenter(this._mainContainer, this._filmsModel.updateFilm, this._commentsModel);
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
