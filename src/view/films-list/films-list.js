import AbstractView from "../abstract-component";
import {createFilmsListTemplate} from "../films-list/films-list-template";

export default class FilmsList extends AbstractView {
  getTemplate() {
    return createFilmsListTemplate();
  }
}
