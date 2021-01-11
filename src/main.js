import {generateFilmCards} from "./mock/film-card";
import {getAllComments} from "./mock/comment";
import MenuPresenter from "./presenter/menu";
import FilmListPresenter from "./presenter/film-list";
import FilmsModel from "./model/films";
import CommentsModel from "./model/comments";
import MenuModel from "./model/menu";

const allFilmcards = generateFilmCards();

const filmsModel = new FilmsModel();
filmsModel.films = allFilmcards;

const allComments = getAllComments();

const commentsModel = new CommentsModel();
commentsModel.comments = allComments;

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);

const menuModel = new MenuModel();

const filterPresenter = new MenuPresenter(siteMainElement, filmsModel, menuModel);
filterPresenter.init();

const filmListPresenter = new FilmListPresenter(siteHeaderElement, siteMainElement, siteFooterElement, filmsModel, commentsModel, menuModel);
filmListPresenter.init();
