import FilmPopupView from "../view/film-popup/film-popup";
import FilmPopupFormView from "../view/film-popup-form/film-popup-form";
import FilmPopupTopContainerView from "../view/film-popup-top-container/film-popup-top-container";
import FilmPopupBottomContainerView from "../view/film-popup-bottom-container/film-popup-bottom-container";
import FilmCardView from "../view/film-card/film-card";
import ClosePopupButtonWrapperView from "../view/close-popup-button-wrapper/close-popup-button-wrapper";
import ClosePopupButtonView from "../view/close-popup-button/close-popup-button";
import {render, RenderPosition, remove} from "../utils/render";
import {isEscEvent} from "../utils/common";

const ELEMENTS_TO_SHOW_POPUP = [
  `film-card__poster`,
  `film-card__title`,
  `film-card__comments`
];

export default class Film {
  constructor(filmsCards, mainContainer, filmsListContainer) {
    this._mainContainer = mainContainer;
    this._filmsListContainerComponent = filmsListContainer;
    this._filmsCards = filmsCards;
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._filmPopupComponent = new FilmPopupView();
    this._closePopupButtonComponent = new ClosePopupButtonView();
    this._handleClosePopupButtonClick = this._handleClosePopupButtonClick.bind(this);
    this._handlePopupEscKeyDown = this._handlePopupEscKeyDown.bind(this);
    this._filmCard = null;
    this._cardComments = null;
  }

  init(filmCard, cardComments) {
    this._filmCard = filmCard;
    this._cardComments = cardComments;

    const commentsCount = this._cardComments.length;
    const filmCardComponent = new FilmCardView(filmCard, commentsCount);

    this._filmsListContainerComponent.setClickHandler(this._handleFilmCardClick);

    render(this._filmsListContainerComponent, filmCardComponent);
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

    this._mainContainer.classList.toggle(`hide-overflow`);
    this._closePopupButtonComponent.clearClickHandler();
    document.removeEventListener(`keydown`, this._handlePopupEscKeyDown);
  }

  _handleFilmCardClick(evt) {
    const showPopup = this._isPopupElementClicked(evt.target.className);

    if (showPopup) {
      evt.preventDefault();

      const cardId = evt.target.parentNode.dataset.id;
      const clickedCard = this._getClickedCard(cardId);

      if (clickedCard) {
        this._renderPopup(clickedCard);
        document.addEventListener(`keydown`, this._handlePopupEscKeyDown);
      }
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

  _renderPopupTopContainer(popupTopContainer, card) {
    this._appendPopupWithCloseButton(popupTopContainer);
    //appendPopupWithInfo(popupTopContainer, card);
    //appendPopupWithControls(popupTopContainer);
  }

  _renderPopup(card) {
    const popupFormComponent = new FilmPopupFormView();
    const popupTopContainerComponent = new FilmPopupTopContainerView();
    const popupBottomContainerComponent = new FilmPopupBottomContainerView();

    this._appendMainWithPopup(popupFormComponent.element, popupTopContainerComponent.element, popupBottomContainerComponent.element);

    this._renderPopupTopContainer(popupTopContainerComponent.element, card);
    //renderPopupBottomContainer(popupBottomContainer, card);

    this._mainContainer.classList.toggle(`hide-overflow`);
  }
}
