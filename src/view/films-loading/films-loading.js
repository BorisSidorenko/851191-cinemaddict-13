import AbstractView from "../abstract-component";
import {createFilmsLodagingTemplate} from "../films-loading/films-loading-template";

export default class FilmsLoading extends AbstractView {
  getTemplate() {
    return createFilmsLodagingTemplate();
  }
}
