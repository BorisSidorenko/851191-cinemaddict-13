import ProfileView from "../view/profile/profile";
import SiteFilterView from "../view/site-menu/site-menu";
import SortView from "../view/sort/sort";
import FilmsWrapperView from "../view/films/films";
import FilmsListView from "../view/films-list/films-list";
import EmptyFilmsListView from "../view/films-list-empty/films-list-empty";
import FilmsListContainer from "../view/films-list-container/films-list-container";
import ShowMoreButtonView from "../view/show-more-button/show-more-button";
import FilmsCountView from "../view/films-count/films-count";
import FilmPopupView from "../view/film-popup/film-popup";
import FilmPopupFormView from "../view/film-popup-form/film-popup-form";
import FilmPopupTopContainerView from "../view/film-popup-top-container/film-popup-top-container";
import FilmPopupBottomContainerView from "../view/film-popup-bottom-container/film-popup-bottom-container";
import ClosePopupButtonWrapperView from "../view/close-popup-button-wrapper/close-popup-button-wrapper";
import ClosePopupButtonView from "../view/close-popup-button/close-popup-button";
import FilmPopupInfoWrapView from "../view/film-popup-info-wrap/film-popup-info-wrap";
import FilmPopupPosterView from "../view/film-popup-poster/film-popup-poster";
import FilmPopupInfoView from "../view/film-popup-info/film-popup-info";
import FilmPopupControlsView from "../view/film-popup-controls/film-popup-controls";
import FilmPopupCommentsWrapView from "../view/film-popup-comments-wrap/film-popup-comments-wrap";
import FilmPopupCommentsListView from "../view/film-popup-comments-list/film-popup-comments-list";
import FilmPopupNewCommentView from "../view/film-popup-new-comment/film-popup-new-comment";
import FilmPresenter from "../presenter/film";

import {getRandomIntInRange, updateItem, isEscEvent} from "../utils/common";
import {render, RenderPosition, remove} from "../utils/render";
import {ProfileRank, CARDS_TO_SHOW_COUNT} from "../utils/constants";

const profileComponent = new ProfileView(getRandomIntInRange(ProfileRank.MAX, ProfileRank.MIN));
const sortComponent = new SortView();
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
    this._filmsCards = null;
    this._comments = null;

    this._filmPresenter = {};
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleOpenedPopup = this._handleOpenedPopup.bind(this);
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._clickedCard = null;
    this._handlePopupEscKeyDown = this._handlePopupEscKeyDown.bind(this);
    this._handleClosePopupButtonClick = this._handleClosePopupButtonClick.bind(this);

    this._filmPopupComponent = new FilmPopupView();
    this._popupOpened = false;
    this._closePopupButtonComponent = new ClosePopupButtonView();
    this._filmPopupControlsComponent = null;
    //this._handleClosePopupButtonClick = closeBtnClick;
  }

  init(filmsCards, comments) {
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

  _renderSort() {
    render(this._mainContainer, sortComponent);
  }

  _renderFilmsWrapper() {
    render(this._mainContainer, filmsWrapperComponent);
  }

  _render() {
    this._renderProfile();

    if (this._filmsCards.length === 0) {
      this._renderEmptyFilmsList();
      return;
    }

    this._renderFilter();

    this._renderSort();

    this._renderFilms();

    this._renderFilmsCount();
  }

  _renderFilms() {
    render(this._mainContainer, filmsListComponent);

    this._renderFilmsListContainer();
    this._renderFilmsCards(this._filmsCards.slice(0, CARDS_TO_SHOW_COUNT));

    this._renderShowMoreButton();
  }

  _renderFilmsListContainer() {
    render(filmsListComponent, filmsListContainerComponent);
  }

  _renderEmptyFilmsList() {
    remove(sortComponent);
    render(filmsWrapperComponent, emptyFilmsListComponent);
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
    filmPresenter.init(this._filmsCards, cardToShow);
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
    this._filmsCards = updateItem(this._filmsCards, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(this._filmsCards, updatedFilm);
  }

  _handleOpenedPopup() {
    //Object.values(this._filmPresenter).forEach((presenter) => presenter.closeOpenedPopup());
  }

  _handleClosePopupButtonClick() {
    this._filmPresenter[this._clickedCard.id].closePopup();
    document.removeEventListener(`keydown`, this._handlePopupEscKeyDown);
  }

  _onPopupEscPress(evt) {
    isEscEvent(evt, this._handleClosePopupButtonClick.bind(this));
  }

  _handlePopupEscKeyDown(evt) {
    this._onPopupEscPress(evt);
  }

  _handleFilmCardClick(clickedCard) {
    this._clickedCard = clickedCard;
    this._handleOpenedPopup();
    this._renderPopup(this._clickedCard);
    document.addEventListener(`keydown`, this._handlePopupEscKeyDown);
  }

  _closePopup() {
    remove(this._filmPopupComponent);

    this._mainContainer.parentNode.classList.remove(`hide-overflow`);
    this._closePopupButtonComponent.clearClickHandler();

    this._popupOpened = false;
  }

  _closeOpenedPopup() {
    if (this._popupOpened === true) {
      this.closePopup();
    }
  }

  _appendMainWithPopup(popupForm, popupTopContainer, popupBottomContainer) {
    render(this._mainContainer, this._filmPopupComponent);
    render(this._filmPopupComponent, popupForm);
    render(popupForm, popupTopContainer);
    render(popupForm, popupBottomContainer);
  }

  _handleClosePopupButtonClick() {
    this._closePopup();
  }

  _appendPopupWithCloseButton(popupTopContainer) {
    const closePopupButtonWrapperComponent = new ClosePopupButtonWrapperView();

    render(popupTopContainer, closePopupButtonWrapperComponent);
    render(closePopupButtonWrapperComponent, this._closePopupButtonComponent);

    this._closePopupButtonComponent.setClickHandler(this._handleClosePopupButtonClick);
  }

  _appendPopupWithInfo(popupTopContainer, card) {
    const filmPopupInfoWrapComponent = new FilmPopupInfoWrapView();
    render(popupTopContainer, filmPopupInfoWrapComponent);

    render(filmPopupInfoWrapComponent, new FilmPopupPosterView(card));
    render(filmPopupInfoWrapComponent, new FilmPopupInfoView(card));
  }

  _renderPopupControls(popupTopContainer, card) {
    if (this._filmPopupControlsComponent !== null) {
      remove(this._filmPopupControlsComponent);
    }

    this._filmPopupControlsComponent = new FilmPopupControlsView(card);

    this._setPopupControlsHandlers();

    render(popupTopContainer, this._filmPopupControlsComponent);
  }

  _setPopupControlsHandlers() {
    this._filmPopupControlsComponent.setAddToHistoryClickHandler(this._handleAddToHistoryClick);
    this._filmPopupControlsComponent.setAddToWatchListClickHandler(this._handleAddToWatchListClick);
    this._filmPopupControlsComponent.setAddToFavoriteClickHandler(this._handleAddToFavoriteClick);
  }

  _appendPopupWithComments(popupBottomContainer, comments) {
    const filmPopupCommentsWrapComponent = new FilmPopupCommentsWrapView(comments.length);
    render(popupBottomContainer, filmPopupCommentsWrapComponent);

    render(filmPopupCommentsWrapComponent, new FilmPopupCommentsListView(comments));
    render(filmPopupCommentsWrapComponent, new FilmPopupNewCommentView());
  }

  _renderPopupTopContainer(popupTopContainer, card) {
    this._appendPopupWithCloseButton(popupTopContainer);
    this._appendPopupWithInfo(popupTopContainer, card);
    this._renderPopupControls(popupTopContainer, card);
  }

  _getFilmCardComments({id}) {
    return this._comments[id];
  }

  _renderPopupBottomContainer(popupBottomContainer, card) {
    const comments = this._getFilmCardComments(card);
    this._appendPopupWithComments(popupBottomContainer, comments);
  }

  _renderPopup(card) {
    const popupFormComponent = new FilmPopupFormView();
    const popupTopContainerComponent = new FilmPopupTopContainerView();
    const popupBottomContainerComponent = new FilmPopupBottomContainerView();

    this._appendMainWithPopup(popupFormComponent, popupTopContainerComponent, popupBottomContainerComponent);

    this._renderPopupTopContainer(popupTopContainerComponent, card);
    this._renderPopupBottomContainer(popupBottomContainerComponent, card);

    this._mainContainer.parentNode.classList.add(`hide-overflow`);
    this._popupOpened = true;
  }
}
