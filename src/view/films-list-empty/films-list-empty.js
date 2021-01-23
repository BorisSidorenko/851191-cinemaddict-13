import AbstractView from "../abstract-component";
import {createFilmsListEmptyTemplate} from "../films-list-empty/films-list-empty-template";

export default class FilmsListEmpty extends AbstractView {
  getTemplate() {
    return createFilmsListEmptyTemplate();
  }
}
