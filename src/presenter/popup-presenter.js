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

import {isEscEvent, isSubmitFormEvent} from "../utils/common";
import {PopupControlsName, UserDetails} from "../utils/constants";
import {render, remove} from "../utils/render";
import {UserAction} from "../utils/constants";

export default class PopupPresenter {
  constructor({mainContainer, changeData, commentsModel, apiWithProvider}) {
    this._mainContainer = mainContainer;
    this._changeData = changeData;
    this._commentsModel = commentsModel;
    this._apiWithProvider = apiWithProvider;
    this._openedPopupHandler = this._openedPopupHandler.bind(this);
    this._popupEscKeyDownHandler = this._popupEscKeyDownHandler.bind(this);
    this._closePopupButtonClickHandler = this._closePopupButtonClickHandler.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._filmPopupComponent = null;
    this._popupOpened = false;
    this._closePopupButtonComponent = new ClosePopupButtonView();
    this._filmPopupControlsComponent = null;
    this._popupControlsClickHandler = this._popupControlsClickHandler.bind(this);
    this._filmCard = null;
    this._filmPopupCommentsWrapComponent = null;
    this._popupBottomContainerComponent = null;
    this._filmPopupNewCommentComponent = null;
    this._popupTopContainerComponent = null;
    this._popupFormComponent = null;
    this._deleteCommentButtonClickHandler = this._deleteCommentButtonClickHandler.bind(this);
    this._submitForm = this._submitForm.bind(this);

    this._modelEventHandler = this._modelEventHandler.bind(this);
    this._commentsModel.addObserver(this._modelEventHandler);
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

  _openedPopupHandler() {
    this._closeOpenedPopup();
  }

  _onPopupEscPress(evt) {
    isEscEvent(evt, this._closePopup);
  }

  _popupEscKeyDownHandler(evt) {
    this._onPopupEscPress(evt);
  }

  _updateCommnetsCount() {
    const comments = this._getCardComments();
    const commentsIds = comments.map(({id}) => id);

    const updatedFilmCard = Object.assign(
        {},
        this._filmCard,
        {
          comments: commentsIds
        }
    );

    this._changeData(updatedFilmCard);
  }

  _removeCommentIdFromCard({id}) {
    this._filmCard.comments = this._filmCard.comments.filter((comment) => comment !== id);
  }

  _disablePopupForm(isFormDisabled) {
    const formElements = Array.from(this._popupFormComponent.element.elements);
    const [, ...restElements] = formElements;

    restElements.forEach((element) => {
      element.disabled = isFormDisabled;
    });
  }

  _shakeFormOnError() {
    this._popupFormComponent.shakeElement();
  }

  _submitForm() {
    const commentEmoji = this._popupFormComponent.element[`comment-emoji`].value;
    const commentText = this._popupFormComponent.element[`comment`].value;

    if (commentEmoji && commentText) {
      const localComment = {
        comment: commentText,
        date: dayjs().format(),
        emotion: commentEmoji,
      };

      this._disablePopupForm(true);

      this._apiWithProvider.addComment(this._filmCard.id, localComment)
      .then(({movie, comments}) => {
        this._filmCard = movie;
        return comments;
      })
      .then((comments) => {
        this._commentsModel.updateComments(
            UserAction.ADD_COMMENT,
            this._filmCard,
            comments
        );
      })
      .then(() => this._updateCommnetsCount())
      .catch(() => {
        this._shakeFormOnError();
        this._disablePopupForm(false);
      });
    }
  }

  _formSubmitHandler(evt) {
    isSubmitFormEvent(evt, this._submitForm);
  }

  _closePopup() {
    remove(this._filmPopupComponent);

    this._mainContainer.parentNode.classList.remove(`hide-overflow`);
    this._closePopupButtonComponent.clearClickHandler();
    document.removeEventListener(`keydown`, this._popupEscKeyDownHandler);
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

  _closePopupButtonClickHandler() {
    this._closePopup();
  }

  _appendPopupWithCloseButton(popupTopContainer) {
    const closePopupButtonWrapperComponent = new ClosePopupButtonWrapperView();

    render(popupTopContainer, closePopupButtonWrapperComponent);
    render(closePopupButtonWrapperComponent, this._closePopupButtonComponent);

    this._closePopupButtonComponent.setClickHandler(this._closePopupButtonClickHandler);
  }

  _appendPopupWithInfo(popupTopContainer, card) {
    const filmPopupInfoWrapComponent = new FilmPopupInfoWrapView();
    render(popupTopContainer, filmPopupInfoWrapComponent);

    render(filmPopupInfoWrapComponent, new FilmPopupPosterView(card.film_info));
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
    this._filmPopupControlsComponent.setClickHandlers(this._popupControlsClickHandler);
  }

  _getKeyByValue(obj, val) {
    return Object.keys(obj).find((key) => obj[key] === val);
  }

  _getPropToChange(evt) {
    const allControlsNames = Object.values(PopupControlsName);
    const clickedControlName = allControlsNames.find((controlName) => controlName === evt.target.name);
    const propToChangeName = this._getKeyByValue(PopupControlsName, clickedControlName);

    let propToChange = {
      [`${propToChangeName}`]: !this._filmCard.user_details[propToChangeName]
    };

    if (propToChangeName === UserDetails.ALREADY_WATCHED) {
      propToChange = Object.assign(
          {},
          propToChange,
          {
            "watching_date": dayjs().format()
          }
      );
    }

    return propToChange;
  }

  _popupControlsClickHandler(evt) {
    const propToChange = this._getPropToChange(evt);

    const updatedUserDetails = Object.assign(
        {},
        this._filmCard.user_details,
        propToChange
    );

    const updatedFilmCard = Object.assign(
        {},
        this._filmCard,
        {
          "user_details": updatedUserDetails
        }
    );

    this._apiWithProvider.updateFilm(updatedFilmCard)
    .then((filmCard) => this._changeData(filmCard));
  }

  _modelEventHandler(isInit) {
    if (!isInit) {
      this._appendPopupWithComments();
    }
  }

  _disableDeleteButton(deleteButton, isButtonDisabled) {
    deleteButton.disabled = isButtonDisabled;
    deleteButton.innerHTML = isButtonDisabled ? `Deleting…` : `Delete`;
  }

  _deleteCommentButtonClickHandler(evt) {
    if (evt.target.tagName === `BUTTON`) {
      const deleteButton = evt.target;
      this._disableDeleteButton(deleteButton, true);

      const commentId = evt.target.dataset.idComment;
      const cardComments = this._getCardComments();
      const commentToDelete = cardComments.find((comment) => comment.id === commentId);

      this._apiWithProvider.deleteComment(this._filmCard, commentId)
      .then(() => this._commentsModel.updateComments(
          UserAction.DELETE_COMMENT,
          this._filmCard,
          commentToDelete
      ))
      .then(() => this._removeCommentIdFromCard(commentToDelete))
      .then(() => this._updateCommnetsCount())
      .catch(() => {
        this._shakeFormOnError();
        this._disableDeleteButton(deleteButton, false);
      });
    }
  }

  _getCardComments() {
    return this._commentsModel.getFilmCardComments(this._filmCard);
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
    popupCommentsComponent.setDeleteButtonHandlers(this._deleteCommentButtonClickHandler);

    const prevFilmPopupNewCommentComponent = this._filmPopupNewCommentComponent;

    if (prevFilmPopupNewCommentComponent) {
      remove(prevFilmPopupNewCommentComponent);
    }

    this._filmPopupNewCommentComponent = new FilmPopupNewCommentView();

    render(this._filmPopupCommentsWrapComponent, popupCommentsComponent);
    render(this._filmPopupCommentsWrapComponent, this._filmPopupNewCommentComponent);
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
    document.removeEventListener(`keydown`, this._formSubmitHandler);
  }

  _setSubmitHandler() {
    document.addEventListener(`keydown`, this._formSubmitHandler);
  }

  _renderPopup(card) {
    this._openedPopupHandler();

    this._popupFormComponent = new FilmPopupFormView();
    this._popupTopContainerComponent = new FilmPopupTopContainerView();
    this._popupBottomContainerComponent = new FilmPopupBottomContainerView();

    this._appendMainWithPopup(this._popupFormComponent, this._popupTopContainerComponent);

    this._renderPopupTopContainer(this._popupTopContainerComponent, card);
    this._renderPopupBottomContainer();

    this._setSubmitHandler();

    document.addEventListener(`keydown`, this._popupEscKeyDownHandler);
    this._mainContainer.parentNode.classList.add(`hide-overflow`);
    this._popupOpened = true;
  }
}
