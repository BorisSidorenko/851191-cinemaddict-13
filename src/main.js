import {Server} from "./utils/constants";
import MenuPresenter from "./presenter/menu";
import FilmListPresenter from "./presenter/film-list";
import FilmsModel from "./model/films";
import CommentsModel from "./model/comments";
import MenuModel from "./model/menu";
import Api from "././api";

const api = new Api(Server.ENDPOINT, Server.AUTHORIZATION);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterStatisticsElement = siteBodyElement.querySelector(`.footer__statistics`);

const menuModel = new MenuModel();

const filterPresenter = new MenuPresenter(siteMainElement, filmsModel, menuModel);
filterPresenter.init();

const filmListPresenter = new FilmListPresenter(siteHeaderElement, siteMainElement, siteFooterStatisticsElement, filmsModel, commentsModel, menuModel, api);
filmListPresenter.init();

api.getFilms()
.then((allFilms) => {
  allFilms.forEach(((film) => {
    api.getFilmComments(film)
    .then((comments) => {
      commentsModel.setComments(film, comments);
    });
  }));

  return allFilms;
})
.then((allFilms) => {
  filmsModel.films = allFilms;
});
