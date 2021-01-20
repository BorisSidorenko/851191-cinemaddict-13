import {Server, STORAGE_NAME, ToastType} from "./utils/constants";
import MenuPresenter from "./presenter/menu";
import FilmListPresenter from "./presenter/film-list";
import FilmsModel from "./model/films";
import CommentsModel from "./model/comments";
import MenuModel from "./model/menu";
import Api from "./api/api";
import Provider from "./api/provider";
import Store from "./api/store";
import {toast} from "./utils/toast";

const api = new Api(Server.ENDPOINT, Server.AUTHORIZATION);
const store = new Store(STORAGE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterStatisticsElement = siteBodyElement.querySelector(`.footer__statistics`);

const menuModel = new MenuModel();

const filterPresenter = new MenuPresenter(siteMainElement, filmsModel, commentsModel, menuModel);
filterPresenter.init();

const filmListPresenter = new FilmListPresenter(siteHeaderElement, siteMainElement, siteFooterStatisticsElement, filmsModel, commentsModel, menuModel, apiWithProvider);
filmListPresenter.init();

apiWithProvider.getFilms()
.catch(() => [])
.then((allFilms) => {
  filmsModel.films = allFilms;
  return allFilms;
})
.then((allFilms) => {
  return allFilms.map((({id}) => {
    return apiWithProvider.getFilmComments(id);
  }));
})
.then((allFilmsPromises) => Promise.all(allFilmsPromises))
.catch(() => [])
.then((comments) => commentsModel.setComments(comments));


window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  toast(`You're online!`, ToastType.SUCCESS);

  if (apiWithProvider.isSyncNedeed) {
    apiWithProvider.sync();
  }
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
  toast(`You're offline!`, ToastType.WARNING);
});
