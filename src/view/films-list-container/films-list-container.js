import AbstractView from "../abstract-component";
import {createFilmsListContainerTemplate} from "../films-list-container/films-list-container-template";

export default class FilmsListContainer extends AbstractView {
  getTemplate() {
    return createFilmsListContainerTemplate();
  }
}
