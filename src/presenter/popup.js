import dayjs from "dayjs";
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

import {generateComment} from "../mock/comment";
import {isEscEvent, isSubmitFormEvent} from "../utils/common";
import {PopupControlsName, UserDetails} from "../utils/constants";
import {render, remove} from "../utils/render";
import {UserAction} from "../utils/constants";

export default class PopupPresenter {
  constructor({mainContainer, changeData, commentsModel}) {
    this._mainContainer = mainContainer;
    this._changeData = changeData;
    this._commentsModel = commentsModel;
    this._handleOpenedPopup = this._handleOpenedPopup.bind(this);
    this._handlePopupEscKeyDown = this._handlePopupEscKeyDown.bind(this);
    this._handleClosePopupButtonClick = this._handleClosePopupButtonClick.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._filmPopupComponent = null;
    this._popupOpened = false;
    this._closePopupButtonComponent = new ClosePopupButtonView();
    this._filmPopupControlsComponent = null;
    this._handlePopupControlsClick = this._handlePopupControlsClick.bind(this);
    this._filmCard = null;
    this._filmPopupCommentsWrapComponent = null;
    this._popupBottomContainerComponent = null;
    this._popupTopContainerComponent = null;
    this._popupFormComponent = null;
    this._handleDeleteCommentButtonClick = this._handleDeleteCommentButtonClick.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._commentsModel.addObserver(this._handleModelEvent);
  }

  init(filmCard) {
    this._filmCard = filmCard;

    if (this._filmPopupComponent === null) {
      this._renderPopup(filmCard, this._getCardComments());
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
  }

  _handlePopupEscKeyDown(evt) {
    this._onPopupEscPress(evt);
  }

  _updateCommnetsCount() {
    const updatedFilmCard = Object.assign(
        {},
        this._filmCard,
        {
          commentsCount: this._getCardComments().length
        }
    );

    this._changeData(updatedFilmCard);
  }

  _submitForm() {
    const commentTemplate = generateComment(this._filmCard.id)();
    const commentEmoji = this._popupFormComponent.element[`comment-emoji`].value;
    const commentText = this._popupFormComponent.element[`comment`].value;

    if (commentEmoji && commentText) {
      const localComment = Object.assign(
          {},
          commentTemplate,
          {
            comment: commentText,
            emoji: commentEmoji,
            text: commentText
          }
      );

      this._commentsModel.updateComments(
          UserAction.ADD_COMMENT,
          localComment
      );

      this._updateCommnetsCount();
    }
  }

  _handleFormSubmit(evt) {
    isSubmitFormEvent(evt, this._submitForm.bind(this));
  }

  _closePopup() {
    remove(this._filmPopupComponent);

    this._mainContainer.parentNode.classList.remove(`hide-overflow`);
    this._closePopupButtonComponent.clearClickHandler();
    document.removeEventListener(`keydown`, this._handlePopupEscKeyDown);
    this._clearSubmitHandler();

    this._popupOpened = false;
  }

  _closeOpenedPopup() {
    if (this._popupOpened === true) {
      this._closePopup();
    }
  }

  _appendMainWithPopup(popupForm, popupTopContainer) {
    this._filmPopupComponent = new FilmPopupView();

    render(this._mainContainer, this._filmPopupComponent);
    render(this._filmPopupComponent, popupForm);
    render(popupForm, popupTopContainer);
    render(popupForm, this._popupBottomContainerComponent);
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

  _getPropToChange(evt) {
    const allControlsNames = Object.values(PopupControlsName);
    const clickedControlName = allControlsNames.find((controlName) => controlName === evt.target.name);
    const propToChangeName = this._getKeyByValue(PopupControlsName, clickedControlName);

    let propToChange = {
      [`${propToChangeName}`]: !this._filmCard.userDetails[propToChangeName]
    };

    if (propToChangeName === UserDetails.ALREADY_WATCHED) {
      propToChange = Object.assign(
          {},
          propToChange,
          {
            watchingDate: dayjs().format()
          }
      );
    }

    return propToChange;
  }

  _handlePopupControlsClick(evt) {
    const propToChange = this._getPropToChange(evt);

    const updatedUserDetails = Object.assign(
        {},
        this._filmCard.userDetails,
        propToChange
    );

    const updatedFilmCard = Object.assign(
        {},
        this._filmCard,
        {
          userDetails: updatedUserDetails
        }
    );

    this._changeData(updatedFilmCard);
  }

  _handleModelEvent() {
    this._appendPopupWithComments();
  }

  _handleDeleteCommentButtonClick(evt) {
    if (evt.target.tagName === `BUTTON`) {
      const commentId = evt.target.dataset.idComment;
      const cardComments = this._getCardComments();
      const commentToDelete = cardComments.find((comment) => comment.id === commentId);

      this._commentsModel.updateComments(
          UserAction.DELETE_COMMENT,
          commentToDelete
      );

      this._updateCommnetsCount();
    }
  }

  _getCardComments() {
    return this._commentsModel.getFilmCardComments(this._filmCard.id);
  }

  _appendPopupWithComments() {
    const comments = this._getCardComments();
    const prevFilmPopupCommentsWrapComponent = this._filmPopupCommentsWrapComponent;

    if (prevFilmPopupCommentsWrapComponent !== null) {
      remove(prevFilmPopupCommentsWrapComponent);
    }

    this._filmPopupCommentsWrapComponent = new FilmPopupCommentsWrapView(comments.length);
    render(this._popupBottomContainerComponent, this._filmPopupCommentsWrapComponent);

    const popupCommentsComponent = new FilmPopupCommentsListView(comments);
    popupCommentsComponent.setDeleteButtonHandlers(this._handleDeleteCommentButtonClick);

    render(this._filmPopupCommentsWrapComponent, popupCommentsComponent);
    render(this._filmPopupCommentsWrapComponent, new FilmPopupNewCommentView());
  }

  _renderPopupTopContainer(popupTopContainer, card) {
    this._appendPopupWithCloseButton(popupTopContainer);
    this._appendPopupWithInfo(popupTopContainer, card);
    this._renderPopupControls(popupTopContainer, card);
  }

  _renderPopupBottomContainer() {
    this._appendPopupWithComments();
  }

  _clearSubmitHandler() {
    document.removeEventListener(`keydown`, this._handleFormSubmit);
  }

  _setSubmitHandler() {
    document.addEventListener(`keydown`, this._handleFormSubmit);
  }

  _renderPopup(card) {
    this._handleOpenedPopup();

    this._popupFormComponent = new FilmPopupFormView();
    this._popupTopContainerComponent = new FilmPopupTopContainerView();
    this._popupBottomContainerComponent = new FilmPopupBottomContainerView();

    this._appendMainWithPopup(this._popupFormComponent, this._popupTopContainerComponent);

    this._renderPopupTopContainer(this._popupTopContainerComponent, card);
    this._renderPopupBottomContainer();

    this._setSubmitHandler();

    document.addEventListener(`keydown`, this._handlePopupEscKeyDown);
    this._mainContainer.parentNode.classList.add(`hide-overflow`);
    this._popupOpened = true;
  }
}
