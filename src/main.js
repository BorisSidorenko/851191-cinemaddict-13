import {generateFilmCards} from "./mock/film-card";
import {generateComments} from "./mock/comment";
import FilterPresenter from "./presenter/filter";
import FilmListPresenter from "./presenter/film-list";
import FilmsModel from "./model/films";
import CommentsModel from "./model/comments";
import FiltersModel from "./model/filters";

const allFilmcards = generateFilmCards();

const filmsModel = new FilmsModel();
filmsModel.films = allFilmcards;

const getAllComments = () => allFilmcards.reduce((acc, {id}) => {
  acc[id] = generateComments(id);
  return acc;
}, {});

const allComments = getAllComments();

const commentsModel = new CommentsModel();
commentsModel.comments = allComments;

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);

const filtersModel = new FiltersModel();

const filterPresenter = new FilterPresenter(siteMainElement, filmsModel, filtersModel);
filterPresenter.init();

const filmListPresenter = new FilmListPresenter(siteHeaderElement, siteMainElement, siteFooterElement, filmsModel, commentsModel, filtersModel);
filmListPresenter.init();
