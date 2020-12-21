import ProfileView from "../view/profile/profile";
import SiteFilterView from "../view/site-menu/site-menu";
import SortView from "../view/sort/sort";
import FilmsWrapperView from "../view/films/films";
import FilmsListView from "../view/films-list/films-list";
import EmptyFilmsListView from "../view/films-list-empty/films-list-empty";
import FilmsListContainer from "../view/films-list-container/films-list-container";
import ShowMoreButtonView from "../view/show-more-button/show-more-button";
import FilmsCountView from "../view/films-count/films-count";
import FilmPresenter from "../presenter/film";
import PopupPresenter from "../presenter/popup";

import {getRandomIntInRange, updateItem} from "../utils/common";
import {render, RenderPosition, remove} from "../utils/render";
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
  constructor(headerContainer, mainContainer, footerContainer) {
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;
    this._footerContainer = footerContainer;
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._filmCardComponent = null;
    this._sourcedFilmsCards = null;
    this._filmsCards = null;
    this._comments = null;

    this._filmPresenter = {};
    this._filmPopupPresenter = {};
    this._handleFilmChange = this._handleFilmChange.bind(this);

    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._sortComponent = null;
    this._currentSortType = SortType.DEFAULT;
  }

  init(filmsCards, comments) {
    this._sourcedFilmsCards = filmsCards.slice();
    this._filmsCards = filmsCards.slice();
    this._comments = Object.assign({}, comments);

    this._render();
  }

  _renderProfile() {
    render(this._headerContainer, profileComponent);
  }

  _renderFilter() {
    const filterComponent = new SiteFilterView(this._filmsCards);
    render(this._mainContainer, filterComponent, RenderPosition.AFTERBEGIN);
  }

  _sortFilmCards(sortType) {
    if (sortType === SortType.DATE) {
      this._filmsCards = this._filmsCards.sort((a, b) => b.year - a.year);
    } else if (sortType === SortType.RATING) {
      this._filmsCards = this._filmsCards.sort((a, b) => b.rating - a.rating);
    } else {
      this._filmsCards = this._sourcedFilmsCards.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType !== sortType) {
      this._sortFilmCards(sortType);
      this._renderSort();

      this._clearFilmListContainer();
      this._renderFilms();
    }
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
    if (this._filmsCards.length === 0) {
      this._renderEmptyFilmsList();
      return;
    }

    this._renderProfile();

    this._renderFilter();

    this._renderSort();

    this._renderFilms();

    this._renderFilmsCount();
  }

  _renderFilms() {
    this._renderFilmsWrapper();
    render(filmsWrapperComponent, filmsListComponent);

    this._renderFilmsListContainer();
    this._renderFilmsCards(this._filmsCards.slice(0, CARDS_TO_SHOW_COUNT));

    this._renderShowMoreButton();
  }

  _renderFilmsListContainer() {
    render(filmsListComponent, filmsListContainerComponent);
  }

  _addEmptyListToWrapper() {
    render(filmsWrapperComponent, emptyFilmsListComponent);
  }

  _renderEmptyFilmsList() {
    this._renderFilter();

    this._renderFilmsWrapper();

    this._addEmptyListToWrapper();

    this._renderFilmsCount();
  }

  _handleShowMoreButtonClick() {
    showMoreButtonClickCounter += 1;

    const cardsToShow = this._filmsCards.slice(0, CARDS_TO_SHOW_COUNT * showMoreButtonClickCounter);

    this._renderFilmsCards(cardsToShow);

    if (cardsToShow.length === this._filmsCards.length) {
      remove(showMoreButtonComponent);
    } else {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    if (this._filmsCards.length > CARDS_TO_SHOW_COUNT) {
      render(filmsListComponent, showMoreButtonComponent);
      showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
    }
  }

  _renderFilmsCount() {
    const filmsCountComponent = new FilmsCountView(this._filmsCards.length);
    render(this._footerContainer, filmsCountComponent);
  }

  _renderFilmCard(cardToShow) {
    const filmPresenter = new FilmPresenter(this._comments, this._mainContainer, filmsListContainerComponent, this._handleFilmChange, this._handleFilmCardClick);
    const cardToShowCommentsLength = this._getFilmCardComments(cardToShow).length;
    filmPresenter.init(this._filmsCards, cardToShow, cardToShowCommentsLength);
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
    this._filmsCards = updateItem(this._filmsCards, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(this._filmsCards, updatedFilm, comments.length);

    const popupPresenterExists = this._filmPopupPresenter[updatedFilm.id];
    if (popupPresenterExists) {
      this._filmPopupPresenter[updatedFilm.id].init(updatedFilm, comments);
    }
  }

  _getFilmCardComments({id}) {
    return this._comments[id];
  }

  _handleFilmCardClick(card) {
    const clickedCard = card;
    const clickedCardComments = this._getFilmCardComments(card);

    this._removedOpenedPopup();

    const popupPresenter = new PopupPresenter(this._mainContainer, this._handleFilmChange);
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
