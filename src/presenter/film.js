import FilmPopupView from "../view/film-popup/film-popup";
import FilmPopupFormView from "../view/film-popup-form/film-popup-form";
import FilmPopupTopContainerView from "../view/film-popup-top-container/film-popup-top-container";
import FilmPopupBottomContainerView from "../view/film-popup-bottom-container/film-popup-bottom-container";
import FilmCardView from "../view/film-card/film-card";
import ClosePopupButtonWrapperView from "../view/close-popup-button-wrapper/close-popup-button-wrapper";
import ClosePopupButtonView from "../view/close-popup-button/close-popup-button";
import FilmPopupInfoWrapView from "../view/film-popup-info-wrap/film-popup-info-wrap";
import FilmPopupPosterView from "../view/film-popup-poster/film-popup-poster";
import FilmPopupInfoView from "../view/film-popup-info/film-popup-info";
import FilmPopupControlsView from "../view/film-popup-controls/film-popup-controls";
import FilmPopupCommentsWrapView from "../view/film-popup-comments-wrap/film-popup-comments-wrap";
import FilmPopupCommentsListView from "../view/film-popup-comments-list/film-popup-comments-list";
import FilmPopupNewCommentView from "../view/film-popup-new-comment/film-popup-new-comment";
import {render, remove, replace} from "../utils/render";
import {isEscEvent} from "../utils/common";

const ELEMENTS_TO_SHOW_POPUP = [
  `film-card__poster`,
  `film-card__title`,
  `film-card__comments`
];

export default class Film {
  constructor(filmsCards, comments, mainContainer, filmsListContainer, changeData, openedPopupHandle) {
    this._mainContainer = mainContainer;
    this._filmsListContainerComponent = filmsListContainer;
    this._changeData = changeData;
    this._filmsCards = filmsCards;
    this._comments = comments;
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._filmPopupComponent = new FilmPopupView();
    this._popupOpened = false;
    this._openedPopupHandle = openedPopupHandle;
    this._closePopupButtonComponent = new ClosePopupButtonView();
    this._handleClosePopupButtonClick = this._handleClosePopupButtonClick.bind(this);
    this._handlePopupEscKeyDown = this._handlePopupEscKeyDown.bind(this);
    this._handleAddToHistoryClick = this._handleAddToHistoryClick.bind(this);
    this._handleAddToWatchListClick = this._handleAddToWatchListClick.bind(this);
    this._handleAddToFavoriteClick = this._handleAddToFavoriteClick.bind(this);
    this._filmCard = null;
    this._filmCardComponent = null;
    this._cardComments = null;
  }

  _getFilmCardComments({id}) {
    return this._comments[id];
  }

  init(filmCard) {
    this._filmCard = filmCard;
    this._cardComments = this._getFilmCardComments(filmCard);

    const prevFilmCardComponent = this._filmCardComponent;

    const commentsCount = this._cardComments.length;
    this._filmCardComponent = new FilmCardView(filmCard, commentsCount);

    this._filmsListContainerComponent.setClickHandler(this._handleFilmCardClick);
    this._filmCardComponent.setAddToHistoryClickHandler(this._handleAddToHistoryClick);
    this._filmCardComponent.setAddToWatchListClickHandler(this._handleAddToWatchListClick);
    this._filmCardComponent.setAddToFavoriteClickHandler(this._handleAddToFavoriteClick);

    if (prevFilmCardComponent === null) {
      render(this._filmsListContainerComponent, this._filmCardComponent);
      return;
    }

    if (this._filmsListContainerComponent.element.contains(prevFilmCardComponent.element)) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _isPopupElementClicked(className) {
    return ELEMENTS_TO_SHOW_POPUP.some((val) => val === className);
  }

  _getClickedCard(id) {
    return this._filmsCards.find((el) => el.id === id);
  }

  _onPopupEscPress(evt) {
    isEscEvent(evt, this._closePopup.bind(this));
  }

  _handlePopupEscKeyDown(evt) {
    this._onPopupEscPress(evt);
  }

  _closePopup() {
    remove(this._filmPopupComponent);

    this._mainContainer.parentNode.classList.remove(`hide-overflow`);
    this._closePopupButtonComponent.clearClickHandler();
    document.removeEventListener(`keydown`, this._handlePopupEscKeyDown);
  }

  closeOpenedPopup() {
    if (this._popupOpened === true) {
      this._closePopup();
    }
  }

  _handleFilmCardClick(evt) {
    const showPopup = this._isPopupElementClicked(evt.target.className);

    if (showPopup) {
      evt.preventDefault();

      const cardId = evt.target.parentNode.dataset.id;
      const clickedCard = this._getClickedCard(cardId);

      if (clickedCard) {
        this._openedPopupHandle();
        this._renderPopup(clickedCard);
        document.addEventListener(`keydown`, this._handlePopupEscKeyDown);
      }
    }
  }

  _handleAddToWatchListClick() {
    const updatedFilmCard = Object.assign(
        {},
        this._filmCard,
        {
          isWatchlist: !this._filmCard.isWatchlist
        }
    );

    this._changeData(updatedFilmCard);
  }

  _handleAddToHistoryClick() {
    const updatedFilmCard = Object.assign(
        {},
        this._filmCard,
        {
          isHistory: !this._filmCard.isHistory
        }
    );

    this._changeData(updatedFilmCard);
  }

  _handleAddToFavoriteClick() {
    const updatedFilmCard = Object.assign(
        {},
        this._filmCard,
        {
          isFavorite: !this._filmCard.isFavorite
        }
    );

    this._changeData(updatedFilmCard);
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

  _appendPopupWithControls(popupTopContainer, card) {
    const filmPopupControlsComponent = new FilmPopupControlsView(card);
    render(popupTopContainer, filmPopupControlsComponent);

    filmPopupControlsComponent.setAddToHistoryClickHandler(this._handleAddToHistoryClick);
    filmPopupControlsComponent.setAddToWatchListClickHandler(this._handleAddToWatchListClick);
    filmPopupControlsComponent.setAddToFavoriteClickHandler(this._handleAddToFavoriteClick);
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
    this._appendPopupWithControls(popupTopContainer, card);
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
