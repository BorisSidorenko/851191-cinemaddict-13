import {createProfileTemplate} from "./view/profile";
import {createSiteMenuTemplate} from "./view/site-menu";
import {createSortTemplate} from "./view/sort";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
import {createFilmsCountTemplate} from "./view/films-count";
import {createFilmsTemplate} from "./view/films";
import {createFilmCardTemplate} from "./view/film-card";
import {generateFilmPopupTemplate} from "./view/film-popup";
import {generateClosePopupButtonTemaplte} from "./view/close-popup-button";
import {generateFilmPopupInfoWrap} from "./view/film-popup-info-wrap";
import {generateFilmPopupPoster} from "./view/film-popup-poster";
import {generateFilmPopupInfoTemplate} from "./view/film-popup-info";
import {generateFilmPopupControls} from "./view/film-popup-controls";
import {generateFilmPopupCommentsWrap} from "./view/film-popup-comments-wrap";
import {generateFilmPopupCommentsList} from "./view/film-popup-comments-list";
import {generateFilmPopupNewComment} from "./view/film-popup-new-comment";
import {isEscEvent} from "./utils";
import {generateFilmCards} from "./mock/film-card";
import {generateComments} from "./mock/comment";

const CARDS_TO_SHOW_COUNT = 5;

const ELEMENTS_TO_SHOW_POPUP = [
  `film-card__poster`,
  `film-card__title`,
  `film-card__comments`
];

const cards = generateFilmCards();

const render = (container, template, position) => container.insertAdjacentHTML(position, template);

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);

render(siteHeaderElement, createProfileTemplate(), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(cards), `afterbegin`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const filmsSection = siteMainElement.querySelector(`.films-list`);
const filmListContainer = filmsSection.querySelector(`.films-list__container`);

for (let i = 0; i < CARDS_TO_SHOW_COUNT; i++) {
  render(filmListContainer, createFilmCardTemplate(cards[i]), `beforeend`);
}

render(filmsSection, createShowMoreButtonTemplate(), `beforeend`);

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

const renderPopup = (card) => {
  render(siteFooterElement, generateFilmPopupTemplate(), `afterend`);

  const popupForm = siteBodyElement.querySelector(`.film-details__inner`);
  const popupTopContainer = popupForm.querySelector(`.film-details__top-container`);
  const popupBottomContainer = popupForm.querySelector(`.film-details__bottom-container`);

  render(popupTopContainer, generateClosePopupButtonTemaplte(), `beforeend`);
  render(popupTopContainer, generateFilmPopupInfoWrap(), `beforeend`);

  const closePopupButton = popupTopContainer.querySelector(`.film-details__close-btn`);
  const popupInfoWrap = popupTopContainer.querySelector(`.film-details__info-wrap`);

  render(popupInfoWrap, generateFilmPopupPoster(card), `beforeend`);
  render(popupInfoWrap, generateFilmPopupInfoTemplate(card), `beforeend`);
  render(popupTopContainer, generateFilmPopupControls(), `beforeend`);

  render(popupBottomContainer, generateFilmPopupCommentsWrap(card), `beforeend`);

  const commentsWrap = popupBottomContainer.querySelector(`.film-details__comments-wrap`);
  render(commentsWrap, generateFilmPopupCommentsList(generateComments()), `beforeend`);
  render(commentsWrap, generateFilmPopupNewComment(), `beforeend`);

  siteBodyElement.classList.toggle(`hide-overflow`);
  closePopupButton.addEventListener(`click`, closePopup);
};

const onFilmCardClick = (evt) => {
  const isElementToShowPopup = ELEMENTS_TO_SHOW_POPUP.some((val) => val === evt.target.className);

  if (isElementToShowPopup) {
    evt.preventDefault();

    const clickedCard = cards.find((el) => el.id === evt.target.parentNode.dataset.id);

    if (clickedCard) {
      renderPopup(clickedCard);
      document.addEventListener(`keydown`, onPopupEscPress);
    }
  }
};

filmListContainer.addEventListener(`click`, onFilmCardClick);

