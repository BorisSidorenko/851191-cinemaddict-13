import {createProfileTemplate} from "./view/profile.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFilmsCountTemplate} from "./view/films-count.js";
import {createFilmsTemplate} from "./view/films.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {generateFilmPopupTemplate} from "./view/film-popup.js";
import {isEscEvent} from "./utils.js";
import {generateFilmCard} from "./mock/film-card.js";

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
  filmPopup.remove();
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const onPopupEscPress = (evt) => {
  isEscEvent(evt, closePopup);
};

const onFilmCardClick = (evt) => {
  if (ELEMENTS_TO_SHOW_POPUP.some((val) => val === evt.target.className)) {
    evt.preventDefault();
    render(siteBodyElement, generateFilmPopupTemplate(), `beforeend`);
    document.addEventListener(`keydown`, onPopupEscPress);
  }
};

filmListContainer.addEventListener(`click`, onFilmCardClick);

