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

const filterPresenter = new MenuPresenter(siteMainElement, filmsModel, commentsModel, menuModel);
filterPresenter.init();

const filmListPresenter = new FilmListPresenter(siteHeaderElement, siteMainElement, siteFooterStatisticsElement, filmsModel, commentsModel, menuModel, api);
filmListPresenter.init();

api.getFilms()
.catch(() => [])
.then((allFilms) => {
  filmsModel.films = allFilms;
  return allFilms;
})
.then((allFilms) => {
  return allFilms.map((({id}) => {
    return api.getFilmComments(id);
  }));
})
.then((allFilmsPromises) => Promise.all(allFilmsPromises))
.catch(() => [])
.then((comments) => commentsModel.setComments(comments));


window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});
