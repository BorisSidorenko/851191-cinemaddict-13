import {generateFilmCards} from "./mock/film-card";
import {generateComments} from "./mock/comment";
import FilmListPresenter from "./presenter/film-list";

const allFilmcards = generateFilmCards();

const getAllComments = () => allFilmcards.reduce((acc, {id}) => {
  acc[id] = generateComments(id);
  return acc;
}, {});

const allComments = getAllComments();

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);


const filmListPresenter = new FilmListPresenter(siteHeaderElement, siteMainElement, siteFooterElement);
filmListPresenter.init(allFilmcards, allComments);
