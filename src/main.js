import {createProfileTemplate} from "./view/profile";
import {createSiteMenuTemplate} from "./view/site-menu";
import {createSortTemplate} from "./view/sort";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
import {createFilmsCountTemplate} from "./view/films-count";
import {createFilmsTemplate} from "./view/films";
import {createFilmCardTemplate} from "./view/film-card";
import {createFilmPopupTemplate} from "./view/film-popup";
import {createClosePopupButtonTemaplte} from "./view/close-popup-button";
import {createFilmPopupInfoWrap} from "./view/film-popup-info-wrap";
import {createFilmPopupPoster} from "./view/film-popup-poster";
import {createFilmPopupInfoTemplate} from "./view/film-popup-info";
import {createFilmPopupControls} from "./view/film-popup-controls";
import {createFilmPopupCommentsWrap} from "./view/film-popup-comments-wrap";
import {createFilmPopupCommentsList} from "./view/film-popup-comments-list";
import {createFilmPopupNewComment} from "./view/film-popup-new-comment";
import {isEscEvent, getRandomIntInRange} from "./utils";
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

const getAllComments = () => allFilmcards.reduce((acc, card) => {
  const {id} = card;
  acc[id] = generateComments(id);
  return acc;
}, {});

const allComments = getAllComments();

const getFilmCardComments = ({id}) => allComments[id];

const render = (container, template, position) => container.insertAdjacentHTML(position, template);

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);

render(siteHeaderElement, createProfileTemplate(getRandomIntInRange(MAX_PROFILE_RANK, MIN_PROFILE_RANK)), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(allFilmcards), `afterbegin`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const filmsSection = siteMainElement.querySelector(`.films-list`);
const filmListContainer = filmsSection.querySelector(`.films-list__container`);

render(filmsSection, createShowMoreButtonTemplate(), `beforeend`);
const showMoreButton = filmsSection.querySelector(`.films-list__show-more`);

const renderFilmCards = (cardsToShow) => {
  cardsToShow.forEach((cardToShow) => {
    const commentsCount = getFilmCardComments(cardToShow).length;
    const filmCardTemplate = createFilmCardTemplate(cardToShow, commentsCount);
    render(filmListContainer, filmCardTemplate, `beforeend`);
  });
};

const appendFilmCards = (cardsToShow) => {
  filmListContainer.innerHTML = ``;

  renderFilmCards(cardsToShow);

  if (allFilmcards.length === cardsToShow.length) {
    showMoreButton.remove();
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

showMoreButton.addEventListener(`click`, onShowMoreButtonClick);

render(siteFooterElement, createFilmsCountTemplate(), `beforeend`);

const closePopup = () => {
  const filmPopup = siteBodyElement.querySelector(`.film-details`);
  const closePopupButton = filmPopup.querySelector(`.film-details__close-btn`);

  filmPopup.remove();

  siteBodyElement.classList.toggle(`hide-overflow`);
  closePopupButton.removeEventListener(`click`, closePopup);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const onPopupEscPress = (evt) => {
  isEscEvent(evt, closePopup);
};

const appendFooterWithPopup = () => render(siteFooterElement, createFilmPopupTemplate(), `afterend`);

const appendPopupWithCloseButton = (popupTopContainer) => {
  render(popupTopContainer, createClosePopupButtonTemaplte(), `beforeend`);

  const closePopupButton = popupTopContainer.querySelector(`.film-details__close-btn`);

  closePopupButton.addEventListener(`click`, closePopup);
};

const appendPopupWithInfo = (popupTopContainer, card) => {
  render(popupTopContainer, createFilmPopupInfoWrap(), `beforeend`);

  const popupInfoWrap = popupTopContainer.querySelector(`.film-details__info-wrap`);

  render(popupInfoWrap, createFilmPopupPoster(card), `beforeend`);
  render(popupInfoWrap, createFilmPopupInfoTemplate(card), `beforeend`);
};

const appendPopupWithControls = (popupTopContainer) => render(popupTopContainer, createFilmPopupControls(), `beforeend`);

const renderPopupTopContainer = (popupForm, card) => {
  const popupTopContainer = popupForm.querySelector(`.film-details__top-container`);

  appendPopupWithCloseButton(popupTopContainer);
  appendPopupWithInfo(popupTopContainer, card);
  appendPopupWithControls(popupTopContainer);
};

const appendPopupWithComments = (popupBottomContainer, cardComments) => {
  render(popupBottomContainer, createFilmPopupCommentsWrap(cardComments.length), `beforeend`);
  const commentsWrap = popupBottomContainer.querySelector(`.film-details__comments-wrap`);

  render(commentsWrap, createFilmPopupCommentsList(cardComments), `beforeend`);
  render(commentsWrap, createFilmPopupNewComment(), `beforeend`);
};

const renderPopupBottomContainer = (popupForm, card) => {
  const cardComments = getFilmCardComments(card);
  const popupBottomContainer = popupForm.querySelector(`.film-details__bottom-container`);

  appendPopupWithComments(popupBottomContainer, cardComments);
};

const renderPopup = (card) => {
  appendFooterWithPopup();
  const popupForm = siteBodyElement.querySelector(`.film-details__inner`);

  renderPopupTopContainer(popupForm, card);
  renderPopupBottomContainer(popupForm, card);

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

filmListContainer.addEventListener(`click`, onFilmCardClick);

