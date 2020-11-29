import SiteMenuView from "./view/site-menu";
import ProfileView from "./view/profile";
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
import {isEscEvent, getRandomIntInRange, renderTemplate, renderElement, RenderPosition} from "./utils";
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
renderTemplate(siteMainElement, createSortTemplate());
renderTemplate(siteMainElement, createFilmsTemplate());

const filmsSection = siteMainElement.querySelector(`.films-list`);
const filmListContainer = filmsSection.querySelector(`.films-list__container`);

renderTemplate(filmsSection, createShowMoreButtonTemplate());
const showMoreButton = filmsSection.querySelector(`.films-list__show-more`);

const renderFilmCards = (cardsToShow) => {
  cardsToShow.forEach((cardToShow) => {
    const commentsCount = getFilmCardComments(cardToShow).length;
    const filmCardTemplate = createFilmCardTemplate(cardToShow, commentsCount);
    renderTemplate(filmListContainer, filmCardTemplate);
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

renderTemplate(siteFooterElement, createFilmsCountTemplate());

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

const appendFooterWithPopup = () => renderTemplate(siteFooterElement, createFilmPopupTemplate(), `afterend`);

const appendPopupWithCloseButton = (popupTopContainer) => {
  renderTemplate(popupTopContainer, createClosePopupButtonTemaplte());

  const closePopupButton = popupTopContainer.querySelector(`.film-details__close-btn`);

  closePopupButton.addEventListener(`click`, closePopup);
};

const appendPopupWithInfo = (popupTopContainer, card) => {
  renderTemplate(popupTopContainer, createFilmPopupInfoWrap());

  const popupInfoWrap = popupTopContainer.querySelector(`.film-details__info-wrap`);

  renderTemplate(popupInfoWrap, createFilmPopupPoster(card));
  renderTemplate(popupInfoWrap, createFilmPopupInfoTemplate(card));
};

const appendPopupWithControls = (popupTopContainer) => renderTemplate(popupTopContainer, createFilmPopupControls());

const renderPopupTopContainer = (popupForm, card) => {
  const popupTopContainer = popupForm.querySelector(`.film-details__top-container`);

  appendPopupWithCloseButton(popupTopContainer);
  appendPopupWithInfo(popupTopContainer, card);
  appendPopupWithControls(popupTopContainer);
};

const appendPopupWithComments = (popupBottomContainer, cardComments) => {
  renderTemplate(popupBottomContainer, createFilmPopupCommentsWrap(cardComments.length));
  const commentsWrap = popupBottomContainer.querySelector(`.film-details__comments-wrap`);

  renderTemplate(commentsWrap, createFilmPopupCommentsList(cardComments));
  renderTemplate(commentsWrap, createFilmPopupNewComment());
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

