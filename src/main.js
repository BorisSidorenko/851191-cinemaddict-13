import {createProfileTemplate} from "./view/profile.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFilmsCountTemplate} from "./view/films-count.js";
import {createFilmsTemplate} from "./view/films.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {generateFilmCard, generateFilmCards} from "./mock/film-card.js";

const CARDS_COUNT = 5;

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

