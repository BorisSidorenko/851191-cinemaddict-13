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
import {isEscEvent} from "./utils";
import {generateFilmCard} from "./mock/film-card";

const CARDS_COUNT = 5;

const ELEMENTS_TO_SHOW_POPUP = [
  `film-card__poster`,
  `film-card__title`,
  `film-card__comments`
];

const render = (container, template, position) => container.insertAdjacentHTML(position, template);

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);

render(siteHeaderElement, createProfileTemplate(), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(), `afterbegin`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const filmsSection = siteMainElement.querySelector(`.films-list`);
const filmListContainer = filmsSection.querySelector(`.films-list__container`);

for (let i = 0; i < CARDS_COUNT; i++) {
  render(filmListContainer, createFilmCardTemplate(generateFilmCard()), `beforeend`);
}

render(filmsSection, createShowMoreButtonTemplate(), `beforeend`);

render(siteFooterElement, createFilmsCountTemplate(), `beforeend`);

const closePopup = () => {
  const filmPopup = siteBodyElement.querySelector(`.film-details`);
  const closePopupButton = filmPopup.querySelector(`.film-details__close-btn`);

  filmPopup.remove();

  closePopupButton.removeEventListener(`click`, closePopup);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const onPopupEscPress = (evt) => {
  isEscEvent(evt, closePopup);
};

const renderPopup = () => {
  render(siteBodyElement, generateFilmPopupTemplate(), `beforeend`);

  const poupForm = siteBodyElement.querySelector(`.film-details__inner`);
  const popupTopContainer = poupForm.querySelector(`.film-details__top-container`);
  const popupBottomContainer = poupForm.querySelector(`.film-details__bottom-container`);

  render(popupTopContainer, generateClosePopupButtonTemaplte(), `beforeend`);
  render(popupTopContainer, generateFilmPopupInfoWrap(), `beforeend`);
  render(popupTopContainer, generateFilmPopupPoster(), `beforeend`);

  const closePopupButton = popupTopContainer.querySelector(`.film-details__close-btn`);
  closePopupButton.addEventListener(`click`, closePopup);
};

const onFilmCardClick = (evt) => {
  if (ELEMENTS_TO_SHOW_POPUP.some((val) => val === evt.target.className)) {
    evt.preventDefault();

    renderPopup();

    document.addEventListener(`keydown`, onPopupEscPress);
  }
};

filmListContainer.addEventListener(`click`, onFilmCardClick);

