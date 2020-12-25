import {generateFilmCards} from "./mock/film-card";
import {generateComments} from "./mock/comment";
import FilmListPresenter from "./presenter/film-list";
import FilmsModel from "./model/films";

const allFilmcards = generateFilmCards();

const filmsModel = new FilmsModel();
filmsModel.setFilms(allFilmcards);

const getAllComments = () => allFilmcards.reduce((acc, {id}) => {
  acc[id] = generateComments(id);
  return acc;
}, {});

const allComments = getAllComments();

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);


const filmListPresenter = new FilmListPresenter(siteHeaderElement, siteMainElement, siteFooterElement, filmsModel);
filmListPresenter.init(allFilmcards, allComments);
