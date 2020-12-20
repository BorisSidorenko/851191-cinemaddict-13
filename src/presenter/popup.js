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

import {isEscEvent} from "../utils/common";
import {PopupControlsName} from "../utils/constants";
import {render, remove} from "../utils/render";

export default class PopupPresenter {
  constructor(mainContainer, changeData) {
    this._mainContainer = mainContainer;
    this._changeData = changeData;
    this._handleOpenedPopup = this._handleOpenedPopup.bind(this);
    this._handlePopupEscKeyDown = this._handlePopupEscKeyDown.bind(this);
    this._handleClosePopupButtonClick = this._handleClosePopupButtonClick.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._filmPopupComponent = null;
    this._popupOpened = false;
    this._closePopupButtonComponent = new ClosePopupButtonView();
    this._filmPopupControlsComponent = null;
    this._handlePopupControlsClick = this._handlePopupControlsClick.bind(this);
    this._filmCard = null;
    this._popupTopContainerComponent = null;
  }

  init(filmCard, filmCardComments) {
    this._filmCard = filmCard;

    if (this._filmPopupComponent === null) {
      this._renderPopup(filmCard, filmCardComments);
      return;
    }

    this._renderPopupControls(this._popupTopContainerComponent, this._filmCard);
  }

  destroy() {
    remove(this._filmPopupComponent);
  }

  _handleOpenedPopup() {
    this._closeOpenedPopup();
  }

  _onPopupEscPress(evt) {
    isEscEvent(evt, this._closePopup);
    document.removeEventListener(`keydown`, this._handlePopupEscKeyDown);
  }

  _handlePopupEscKeyDown(evt) {
    this._onPopupEscPress(evt);
  }

  _closePopup() {
    remove(this._filmPopupComponent);

    this._mainContainer.parentNode.classList.remove(`hide-overflow`);
    this._closePopupButtonComponent.clearClickHandler();

    this._popupOpened = false;
  }

  _closeOpenedPopup() {
    if (this._popupOpened === true) {
      this._closePopup();
    }
  }

  _appendMainWithPopup(popupForm, popupTopContainer, popupBottomContainer) {
    this._filmPopupComponent = new FilmPopupView();

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
    this._filmPopupControlsComponent.setClickHandlers(this._handlePopupControlsClick);
  }

  _getKeyByValue(obj, val) {
    return Object.keys(obj).find((key) => obj[key] === val);
  }

  _handlePopupControlsClick(evt) {
    const allControlsNames = Object.values(PopupControlsName);
    const clickedControlName = allControlsNames.find((controlName) => controlName === evt.target.name);
    const propToChange = this._getKeyByValue(PopupControlsName, clickedControlName);

    const updatedFilmCard = Object.assign(
        {},
        this._filmCard,
        {
          [`${propToChange}`]: !this._filmCard[propToChange]
        }
    );

    this._changeData(updatedFilmCard);
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

  _renderPopupBottomContainer(popupBottomContainer, comments) {
    this._appendPopupWithComments(popupBottomContainer, comments);
  }

  _renderPopup(card, comments) {
    this._handleOpenedPopup();

    const popupFormComponent = new FilmPopupFormView();
    this._popupTopContainerComponent = new FilmPopupTopContainerView();
    const popupBottomContainerComponent = new FilmPopupBottomContainerView();

    this._appendMainWithPopup(popupFormComponent, this._popupTopContainerComponent, popupBottomContainerComponent);

    this._renderPopupTopContainer(this._popupTopContainerComponent, card);
    this._renderPopupBottomContainer(popupBottomContainerComponent, comments);

    document.addEventListener(`keydown`, this._handlePopupEscKeyDown);
    this._mainContainer.parentNode.classList.add(`hide-overflow`);
    this._popupOpened = true;
  }
}
