import FilmPopupView from "./view/film-popup/film-popup";
import ClosePopupButtonWrapperView from "./view/close-popup-button-wrapper/close-popup-button-wrapper";
import ClosePopupButtonView from "./view/close-popup-button/close-popup-button";
import FilmPopupInfoWrapView from "./view/film-popup-info-wrap/film-popup-info-wrap";
import FilmPopupPosterView from "./view/film-popup-poster/film-popup-poster";
import FilmPopupInfoView from "./view/film-popup-info/film-popup-info";
import FilmPopupFormView from "./view/film-popup-form/film-popup-form";
import FilmPopupTopContainerView from "./view/film-popup-top-container/film-popup-top-container";
import FilmPopupBottomContainerView from "./view/film-popup-bottom-container/film-popup-bottom-container";
import FilmPopupControlsView from "./view/film-popup-controls/film-popup-controls";
import FilmPopupCommentsWrapView from "./view/film-popup-comments-wrap/film-popup-comments-wrap";
import FilmPopupCommentsListView from "./view/film-popup-comments-list/film-popup-comments-list";
import FilmPopupNewCommentView from "./view/film-popup-new-comment/film-popup-new-comment";
import {render, remove} from "./utils/render";
import {isEscEvent} from "./utils/common";
import {generateFilmCards} from "./mock/film-card";
import {generateComments} from "./mock/comment";
import FilmListPresenter from "./presenter/film-list";

const allFilmcards = generateFilmCards();

const getAllComments = () => allFilmcards.reduce((acc, {id}) => {
  acc[id] = generateComments(id);
  return acc;
}, {});

const allComments = getAllComments();

const getFilmCardComments = ({id}) => allComments[id];

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);

const filmPopupComponent = new FilmPopupView();
const closePopupButtonWrapperComponent = new ClosePopupButtonWrapperView();
const closePopupButtonComponent = new ClosePopupButtonView();

const closePopup = () => {
  remove(filmPopupComponent);

  siteBodyElement.classList.toggle(`hide-overflow`);
  closePopupButtonComponent.clearClickHandler();
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const onPopupEscPress = (evt) => {
  isEscEvent(evt, closePopup);
};

const appendFooterWithPopup = (popupForm, popupTopContainer, popupBottomContainer) => {
  render(siteBodyElement, filmPopupComponent);
  render(filmPopupComponent, popupForm);
  render(popupForm, popupTopContainer);
  render(popupForm, popupBottomContainer);
};

const appendPopupWithCloseButton = (popupTopContainer) => {
  render(popupTopContainer, closePopupButtonWrapperComponent);
  render(closePopupButtonWrapperComponent, closePopupButtonComponent);
  closePopupButtonComponent.setClickHandler(closePopup);
};

const appendPopupWithInfo = (popupTopContainer, card) => {
  const filmPopupInfoWrapComponent = new FilmPopupInfoWrapView();
  render(popupTopContainer, filmPopupInfoWrapComponent);

  render(filmPopupInfoWrapComponent, new FilmPopupPosterView(card));
  render(filmPopupInfoWrapComponent, new FilmPopupInfoView(card));
};

const filmPopupControlsComponent = new FilmPopupControlsView();
const appendPopupWithControls = (popupTopContainer) => render(popupTopContainer, filmPopupControlsComponent);

const renderPopupTopContainer = (popupTopContainer, card) => {
  appendPopupWithCloseButton(popupTopContainer);
  appendPopupWithInfo(popupTopContainer, card);
  appendPopupWithControls(popupTopContainer);
};

const appendPopupWithComments = (popupBottomContainer, cardComments) => {
  const filmPopupCommentsWrapComponent = new FilmPopupCommentsWrapView(cardComments.length);
  render(popupBottomContainer, filmPopupCommentsWrapComponent);

  render(filmPopupCommentsWrapComponent.element, new FilmPopupCommentsListView(cardComments));
  render(filmPopupCommentsWrapComponent.element, new FilmPopupNewCommentView());
};

const renderPopupBottomContainer = (popupBottomContainer, card) => {
  const cardComments = getFilmCardComments(card);
  appendPopupWithComments(popupBottomContainer, cardComments);
};

const renderPopup = (card) => {
  const popupForm = new FilmPopupFormView().element;
  const popupTopContainer = new FilmPopupTopContainerView().element;
  const popupBottomContainer = new FilmPopupBottomContainerView().element;

  appendFooterWithPopup(popupForm, popupTopContainer, popupBottomContainer);

  renderPopupTopContainer(popupTopContainer, card);
  renderPopupBottomContainer(popupBottomContainer, card);

  siteBodyElement.classList.toggle(`hide-overflow`);
};

const filmListPresenter = new FilmListPresenter(siteHeaderElement, siteMainElement, siteFooterElement);
filmListPresenter.init(allFilmcards, allComments);
