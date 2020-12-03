import AbstractView from "../abstract-component";
import {createFilmsWrapperTemplate} from "../films/films-template";

export default class FilmsWrapper extends AbstractView {
  getTemplate() {
    return createFilmsWrapperTemplate();
  }
}
