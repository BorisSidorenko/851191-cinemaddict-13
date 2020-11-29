import SiteMenuView from "./view/site-menu";
import ProfileView from "./view/profile";
import SortView from "./view/sort";
import ShowMoreButtonView from "./view/show-more-button";
import FilmsCountView from "./view/films-count";
import FilmsWrapperView from "./view/films";
import FilmsListView from "./view/films-list";
import FilmListContainer from "./view/films-list-container";
import FilmCardView from "./view/film-card";
import FilmPopupView from "./view/film-popup";
import ClosePopupButtonView from "./view/close-popup-button";
import FilmPopupInfoWrapView from "./view/film-popup-info-wrap";
import FilmPopupPosterView from "./view/film-popup-poster";
import FilmPopupInfoView from "./view/film-popup-info";
import FilmPopupFormView from "./view/film-popup-form";
import FilmPopupTopContainerView from "./view/film-popup-top-container";
import FilmPopupBottomContainerView from "./view/film-popup-bottom-container";
import FilmPopupControlsView from "./view/film-popup-controls";
import FilmPopupCommentsWrapView from "./view/film-popup-comments-wrap";
import FilmPopupCommentsListView from "./view/film-popup-comments-list";
import FilmPopupNewCommentView from "./view/film-popup-new-comment";
import {isEscEvent, getRandomIntInRange, renderElement, RenderPosition} from "./utils";
import {generateFilmCards} from "./mock/film-card";
import {generateComments} from "./mock/comment";

const CARDS_TO_SHOW_COUNT = 5;

const MIN_PROFILE_RANK = 0;
const MAX_PROFILE_RANK = 40;

const ELEMENTS_TO_SHOW_POPUP = [
  `film-card__poster`,
  `film-card__title`,
  `film-card__comments`
];

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

renderElement(siteHeaderElement, new ProfileView(getRandomIntInRange(MAX_PROFILE_RANK, MIN_PROFILE_RANK)).getElement());
renderElement(siteMainElement, new SiteMenuView(allFilmcards).getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteMainElement, new SortView().getElement());

const filmsWrapperComponent = new FilmsWrapperView();
const filmsListComponent = new FilmsListView();
const filmsListContainerComponent = new FilmListContainer();

renderElement(siteMainElement, filmsWrapperComponent.getElement());
renderElement(filmsWrapperComponent.getElement(), filmsListComponent.getElement());
renderElement(filmsListComponent.getElement(), filmsListContainerComponent.getElement());

const showMoreButtonComponent = new ShowMoreButtonView();
renderElement(filmsListComponent.getElement(), showMoreButtonComponent.getElement());

const renderFilmCards = (cardsToShow) => {
  cardsToShow.forEach((cardToShow) => {
    const commentsCount = getFilmCardComments(cardToShow).length;
    const filmCard = new FilmCardView(cardToShow, commentsCount).getElement();
    renderElement(filmsListContainerComponent.getElement(), filmCard);
  });
};

const appendFilmCards = (cardsToShow) => {
  filmsListContainerComponent.getElement().innerHTML = ``;

  renderFilmCards(cardsToShow);

  if (allFilmcards.length === cardsToShow.length) {
    showMoreButtonComponent.getElement().remove();
    showMoreButtonComponent.removeElement();
  }
};

const initialCardsToShow = allFilmcards.slice(0, CARDS_TO_SHOW_COUNT);
appendFilmCards(initialCardsToShow);

let showMoreButtonClickCounter = 1;

const onShowMoreButtonClick = () => {
  showMoreButtonClickCounter++;

  const cardsToShow = allFilmcards.slice(0, CARDS_TO_SHOW_COUNT * showMoreButtonClickCounter);

  appendFilmCards(cardsToShow);
};

showMoreButtonComponent.getElement().addEventListener(`click`, onShowMoreButtonClick);

renderElement(siteFooterElement, new FilmsCountView(allFilmcards.length).getElement());

const filmPopupComponent = new FilmPopupView();
const closePopupButtonComponent = new ClosePopupButtonView();

const closePopup = () => {
  filmPopupComponent.getElement().remove();
  filmPopupComponent.removeElement();

  siteBodyElement.classList.toggle(`hide-overflow`);
  closePopupButtonComponent.getElement().removeEventListener(`click`, closePopup);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const onPopupEscPress = (evt) => {
  isEscEvent(evt, closePopup);
};

const appendFooterWithPopup = (popupForm, popupTopContainer, popupBottomContainer) => {
  const filmPopup = filmPopupComponent.getElement();
  renderElement(siteBodyElement, filmPopup);
  renderElement(filmPopup, popupForm);
  renderElement(popupForm, popupTopContainer);
  renderElement(popupForm, popupBottomContainer);
};

const appendPopupWithCloseButton = (popupTopContainer) => {

  renderElement(popupTopContainer, closePopupButtonComponent.getElement());

  closePopupButtonComponent.getElement().addEventListener(`click`, closePopup);
};

const appendPopupWithInfo = (popupTopContainer, card) => {
  const filmPopupInfoWrap = new FilmPopupInfoWrapView().getElement();
  renderElement(popupTopContainer, filmPopupInfoWrap);

  renderElement(filmPopupInfoWrap, new FilmPopupPosterView(card).getElement());
  renderElement(filmPopupInfoWrap, new FilmPopupInfoView(card).getElement());
};

const appendPopupWithControls = (popupTopContainer) => renderElement(popupTopContainer, new FilmPopupControlsView().getElement());

const renderPopupTopContainer = (popupTopContainer, card) => {
  appendPopupWithCloseButton(popupTopContainer);
  appendPopupWithInfo(popupTopContainer, card);
  appendPopupWithControls(popupTopContainer);
};

const appendPopupWithComments = (popupBottomContainer, cardComments) => {
  const filmPopupCommentsWrapComponent = new FilmPopupCommentsWrapView(cardComments.length);
  renderElement(popupBottomContainer, filmPopupCommentsWrapComponent.getElement());

  renderElement(filmPopupCommentsWrapComponent.getElement(), new FilmPopupCommentsListView(cardComments).getElement());
  renderElement(filmPopupCommentsWrapComponent.getElement(), new FilmPopupNewCommentView().getElement());
};

const renderPopupBottomContainer = (popupBottomContainer, card) => {
  const cardComments = getFilmCardComments(card);
  appendPopupWithComments(popupBottomContainer, cardComments);
};

const renderPopup = (card) => {
  const popupForm = new FilmPopupFormView().getElement();
  const popupTopContainer = new FilmPopupTopContainerView().getElement();
  const popupBottomContainer = new FilmPopupBottomContainerView().getElement();

  appendFooterWithPopup(popupForm, popupTopContainer, popupBottomContainer);

  renderPopupTopContainer(popupTopContainer, card);
  renderPopupBottomContainer(popupBottomContainer, card);

  siteBodyElement.classList.toggle(`hide-overflow`);
};

const isPopupElementClicked = (className) => ELEMENTS_TO_SHOW_POPUP.some((val) => val === className);

const getCard = (id) => allFilmcards.find((el) => el.id === id);

const onFilmCardClick = (evt) => {
  const showPopup = isPopupElementClicked(evt.target.className);

  if (showPopup) {
    evt.preventDefault();

    const cardId = evt.target.parentNode.dataset.id;
    const clickedCard = getCard(cardId);

    if (clickedCard) {
      renderPopup(clickedCard);
      document.addEventListener(`keydown`, onPopupEscPress);
    }
  }
};

filmsListContainerComponent.getElement().addEventListener(`click`, onFilmCardClick);

